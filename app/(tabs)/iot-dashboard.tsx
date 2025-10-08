// IoTDashboard.tsx
import { Buffer } from "buffer";
import mqtt, { MqttClient } from "mqtt";
import process from "process";
import React, { useEffect, useRef, useState } from "react";
import { Animated, ScrollView, Text, TouchableOpacity, View, Image, ActivityIndicator } from "react-native";
import "react-native-get-random-values";
// @ts-ignore
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from "../../assets/styles/iot-dashboard.styles";

(global as any).Buffer = Buffer;
(global as any).process = process;

// Backend Configuration
const BACKEND_URL = "http://192.168.1.50:3000"; // Ganti dengan IP Backend Anda

// Data statis tanaman
const PLANT_DATA = {
  name: "Selada (Lettuce)",
  age: 23, // Hari Setelah Semai (HSS)
  count: 24,

  getStandardPPM: (hss: number) => {
    if (hss >= 8 && hss <= 17) return 300;
    if (hss >= 18 && hss <= 33) return 700;
    if (hss >= 34 && hss <= 45) return 800;
    return 0;
  },

  standardPhMin: 5.5,
  standardPhMax: 6.5,
};

const IoTDashboard: React.FC = () => {
  const [client, setClient] = useState<MqttClient | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [ph, setPh] = useState<number>(0);
  const [ppm, setPpm] = useState<number>(0);
  const [pumpPpm, setPumpPpm] = useState<"ON" | "OFF">("OFF");
  const [pumpPh, setPumpPh] = useState<"ON" | "OFF">("OFF");
  const [mode, setMode] = useState<"manual" | "auto">("manual");
  
  // State untuk ESP32-CAM
  const [cameraImage, setCameraImage] = useState<string | null>(null);
  const [isLoadingImage, setIsLoadingImage] = useState<boolean>(false);
  const [lastImageUpdate, setLastImageUpdate] = useState<Date | null>(null);
  const [streamUrl, setStreamUrl] = useState<string>("");
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [esp32camIP, setEsp32camIP] = useState<string>("192.168.1.100"); // Ganti dengan IP ESP32-CAM Anda

  // Animations
  const pumpPhAnimation = useRef(new Animated.Value(pumpPh === "ON" ? 1 : 0)).current;
  const pumpPpmAnimation = useRef(new Animated.Value(pumpPpm === "ON" ? 1 : 0)).current;
  const modeSwitchAnimation = useRef(new Animated.Value(mode === "auto" ? 1 : 0)).current;

  // --- Animation effects ---
  useEffect(() => {
    Animated.timing(pumpPhAnimation, {
      toValue: pumpPh === "ON" ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [pumpPh]);

  useEffect(() => {
    Animated.timing(pumpPpmAnimation, {
      toValue: pumpPpm === "ON" ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [pumpPpm]);

  useEffect(() => {
    Animated.timing(modeSwitchAnimation, {
      toValue: mode === "auto" ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [mode]);

  // --- MQTT Connection ---
  useEffect(() => {
    const mqttClient = mqtt.connect("wss://mqtt-dashboard.com:8884/mqtt");

    mqttClient.on("connect", () => {
      console.log("✅ Connected to MQTT broker");
      setIsConnected(true);
      mqttClient.subscribe("hydroponic/data/#");
      mqttClient.subscribe("hydroponic/mode");
      mqttClient.subscribe("hydroponic/camera/image");
    });

    mqttClient.on("error", (err) => {
      console.log("MQTT Error:", err);
      setIsConnected(false);
    });

    mqttClient.on("close", () => {
      console.log("❌ MQTT disconnected");
      setIsConnected(false);
    });

    mqttClient.on("message", (topic: string, message: Buffer) => {
      const msg = message.toString();
      if (topic === "hydroponic/data/ph") setPh(parseFloat(msg));
      if (topic === "hydroponic/data/ppm") setPpm(parseFloat(msg));
      if (topic === "hydroponic/data/pump_ppm") setPumpPpm(msg as "ON" | "OFF");
      if (topic === "hydroponic/data/pump_ph") setPumpPh(msg as "ON" | "OFF");
      if (topic === "hydroponic/mode") setMode(msg as "manual" | "auto");
      
      // Handle gambar dari ESP32-CAM via MQTT (optional)
      if (topic === "hydroponic/camera/image") {
        try {
          if (msg.startsWith("data:image")) {
            setCameraImage(msg);
          } else {
            setCameraImage(`data:image/jpeg;base64,${msg}`);
          }
          setLastImageUpdate(new Date());
          setIsLoadingImage(false);
        } catch (error) {
          console.error("Error processing camera image:", error);
          setIsLoadingImage(false);
        }
      }
    });

    setClient(mqttClient);

    return () => {
      mqttClient.end();
    };
  }, []);

  // Auto fetch dari database setiap 10 detik (optional)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isStreaming && isConnected) {
        fetchLatestImageFromDB();
      }
    }, 10000); // 10 detik

    return () => clearInterval(interval);
  }, [isStreaming, isConnected]);

  // --- Controls ---
  const changeMode = (newMode: "manual" | "auto") => {
    if (client) {
      client.publish("hydroponic/mode", newMode);
    }
  };

  const togglePumpPpm = () => {
    if (client && mode === "manual") {
      const newStatus = pumpPpm === "ON" ? "OFF" : "ON";
      client.publish("hydroponic/control/pump_ppm", newStatus);
    }
  };

  const togglePumpPh = () => {
    if (client && mode === "manual") {
      const newStatus = pumpPh === "ON" ? "OFF" : "ON";
      client.publish("hydroponic/control/pump_ph", newStatus);
    }
  };

  // Fungsi untuk request gambar baru via MQTT
  const requestNewImage = () => {
    if (client && isConnected) {
      setIsLoadingImage(true);
      client.publish("hydroponic/camera/capture", "REQUEST");
      
      // Fallback: fetch dari database setelah 3 detik
      setTimeout(() => {
        fetchLatestImageFromDB();
      }, 3000);
    }
  };

  // Toggle streaming
  const toggleStreaming = () => {
    if (isStreaming) {
      setStreamUrl("");
      setIsStreaming(false);
    } else {
      setStreamUrl(`http://${esp32camIP}:81/stream`);
      setIsStreaming(true);
    }
  };

  // Fetch captured images from database
  const fetchLatestImageFromDB = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/latest-image`);
      const data = await response.json();
      
      if (data.success && data.image) {
        setCameraImage(data.image);
        setLastImageUpdate(new Date(data.timestamp));
      }
      setIsLoadingImage(false);
    } catch (error) {
      console.error('Error fetching image from DB:', error);
      setIsLoadingImage(false);
    }
  };

  // --- Helpers ---
  const getPhStatus = (value: number) => {
    if (value >= PLANT_DATA.standardPhMin && value <= PLANT_DATA.standardPhMax) {
      return "Normal";
    }
    return value < PLANT_DATA.standardPhMin ? "Too Acidic" : "Too Basic";
  };

  const getPpmStatus = (value: number, standard: number) => {
    if (value >= standard * 0.9 && value <= standard * 1.1) {
      return "Optimal";
    }
    return value < standard * 0.9 ? "Low Nutrients" : "High Nutrients";
  };

  const formatLastUpdate = (date: Date | null) => {
    if (!date) return "No image yet";
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diff < 60) return `${diff} seconds ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    return date.toLocaleTimeString();
  };

  const standardPpm = PLANT_DATA.getStandardPPM(PLANT_DATA.age);

  // --- Anim Interpolations ---
  const modeSliderTranslate = modeSwitchAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 20],
  });
  const modeBackgroundColour = modeSwitchAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["#e5e7eb", "#8eb69b"],
  });

  const pumpPhTranslate = pumpPhAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 26],
  });
  const pumpPhBackgroundColour = pumpPhAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["#e5e7eb", "#4ade80"],
  });

  const pumpPpmTranslate = pumpPpmAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 26],
  });
  const pumpPpmBackgroundColour = pumpPpmAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["#e5e7eb", "#4ade80"],
  });

  const getSliderColor = (pumpStatus: "ON" | "OFF") => {
    if (pumpStatus === "ON") return "#22c55e";
    return mode === "manual" ? "#ffffff" : "#e5e7eb";
  };
  const getIconColor = (pumpStatus: "ON" | "OFF") => {
    if (pumpStatus === "ON") return "#fff";
    return mode === "manual" ? "#94a3b8" : "#ccc";
  };

  // --- Render ---
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🌱 Hydroponic Dashboard</Text>

      {/* Device Status */}
      <View style={[styles.card, isConnected ? styles.cardConnected : styles.cardDisconnected]}>
        <Text style={styles.cardTitle}>Device Status</Text>
        <View style={styles.deviceStatusRow}>
          <Icon name={isConnected ? "wifi" : "wifi-off"} size={20} color={isConnected ? "#10b981" : "#ef4444"} />
          <Text style={styles.deviceStatusText}>
            {isConnected ? "Connected (Live)" : "Disconnected"}
          </Text>
        </View>
      </View>

      {/* Camera Card - ESP32-CAM */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>📷 Live Camera Feed</Text>
          <View style={styles.cameraButtonsRow}>
            <TouchableOpacity
              style={[styles.captureButton, styles.streamButton, isStreaming && styles.streamButtonActive]}
              onPress={toggleStreaming}
              disabled={!isConnected}
            >
              <Icon name={isStreaming ? "video-off" : "video"} size={18} color="#fff" />
              <Text style={styles.captureButtonText}>
                {isStreaming ? "Stop" : "Stream"}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.captureButton, !isConnected && styles.disabledButton]}
              onPress={requestNewImage}
              disabled={!isConnected || isLoadingImage}
            >
              <Icon name="camera-retake" size={18} color="#fff" />
              <Text style={styles.captureButtonText}>Capture</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.cameraContainer}>
          {isLoadingImage && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color="#8eb69b" />
              <Text style={styles.loadingText}>Capturing image...</Text>
            </View>
          )}
          
          {isStreaming && streamUrl ? (
            <Image
              source={{ uri: streamUrl }}
              style={styles.cameraImage}
              resizeMode="cover"
            />
          ) : cameraImage ? (
            <Image
              source={{ uri: cameraImage }}
              style={styles.cameraImage}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.noImagePlaceholder}>
              <Icon name="camera-off" size={48} color="#94a3b8" />
              <Text style={styles.noImageText}>No image available</Text>
              <Text style={styles.noImageSubtext}>
                {isStreaming ? "Starting stream..." : "Tap Stream for live video or Capture for snapshot"}
              </Text>
            </View>
          )}
        </View>
        
        <View style={styles.cameraInfo}>
          {isStreaming && (
            <View style={styles.streamingBadge}>
              <View style={styles.streamingDot} />
              <Text style={styles.streamingText}>LIVE STREAMING</Text>
            </View>
          )}
          {lastImageUpdate && !isStreaming && (
            <Text style={styles.imageTimestamp}>
              Last captured: {formatLastUpdate(lastImageUpdate)}
            </Text>
          )}
        </View>
      </View>

      {/* Plant Info */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🥬 Informasi Tanaman</Text>
        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Sayuran</Text>
            <Text style={styles.infoValue}>{PLANT_DATA.name}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Usia</Text>
            <Text style={styles.infoValue}>{PLANT_DATA.age} HSS</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Jumlah</Text>
            <Text style={styles.infoValue}>{PLANT_DATA.count} unit</Text>
          </View>
        </View>
        <View style={styles.infoDetail}>
          <Text style={styles.infoDetailLabel}>Standar PH:</Text>
          <Text style={styles.infoDetailValue}>
            {PLANT_DATA.standardPhMin} - {PLANT_DATA.standardPhMax}
          </Text>
        </View>
        <View style={styles.infoDetail}>
          <Text style={styles.infoDetailLabel}>Standar PPM:</Text>
          <Text style={styles.infoDetailValue}>
            {standardPpm} ppm (usia {PLANT_DATA.age} HSS)
          </Text>
        </View>
      </View>

      {/* Sensor Cards */}
      <View style={styles.sensorCardsContainer}>
        {/* pH */}
        <View style={styles.cardHighlightHalf}>
          <Text style={styles.cardTitle}>pH Value</Text>
          <View style={styles.sensorRow}>
            <View style={styles.sensorBox}>
              <Icon name="ph" size={24} color="#daf1de" />
              <Text style={styles.sensorValue}>{ph.toFixed(2)}</Text>
              <Text style={styles.sensorLabel}>{getPhStatus(ph)}</Text>
            </View>
          </View>
        </View>

        {/* PPM */}
        <View style={styles.cardHighlightHalf}>
          <Text style={styles.cardTitle}>PPM Value</Text>
          <View style={styles.sensorRow}>
            <View style={styles.sensorBox}>
              <Icon name="water-percent" size={24} color="#daf1de" />
              <Text style={styles.sensorValue}>{ppm.toFixed(0)}</Text>
              <Text style={styles.sensorLabel}>{getPpmStatus(ppm, standardPpm)}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Pump Control */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>
            {mode === "manual" ? "🕹️ Manual Pump Control" : "🤖 Auto Mode Active"}
          </Text>

          {/* Mode Switch */}
          <TouchableOpacity
            style={styles.modeSwitch}
            onPress={() => changeMode(mode === "manual" ? "auto" : "manual")}
            activeOpacity={1}
          >
            <Animated.View style={[styles.modeSwitchBackground, { backgroundColor: modeBackgroundColour }]}>
              <Animated.View
                style={[
                  styles.modeSwitchSlider,
                  { transform: [{ translateX: modeSliderTranslate }], backgroundColor: mode === "auto" ? "#fff" : "#94a3b8" },
                ]}
              />
            </Animated.View>
            <Text style={[styles.modeSwitchLabel, mode === "auto" && styles.modeSwitchLabelActive]}>
              Auto
            </Text>
          </TouchableOpacity>
        </View>

        {/* Pumps */}
        <View style={styles.pumpsContainer}>
          <View style={styles.pumpCardsContainer}>
            {/* pH Pump */}
            <View style={styles.pumpCard}>
              <Text style={styles.pumpCardTitle}>pH Pump</Text>
              <View style={styles.pumpContent}>
                <View style={styles.pumpIconContainer}>
                  <View style={styles.pumpIconWrapper}>
                    <Icon name={pumpPh === "ON" ? "pump" : "pump-off"} size={40} color={pumpPh === "ON" ? "#4ade80" : "#94a3b8"} />
                  </View>
                </View>
                <View style={styles.pumpStatusContainer}>
                  <Text style={[styles.pumpStatus, pumpPh === "ON" ? styles.statusOn : styles.statusOff]}>
                    {pumpPh}
                  </Text>
                </View>
                <View style={styles.pumpToggleContainer}>
                  <TouchableOpacity
                    style={[styles.powerToggle, mode !== "manual" && styles.disabledToggle]}
                    onPress={togglePumpPh}
                    activeOpacity={1}
                    disabled={mode !== "manual"}
                  >
                    <Animated.View style={[styles.powerToggleBackground, { backgroundColor: pumpPhBackgroundColour }]}>
                      <Animated.View
                        style={[styles.powerSlider, { transform: [{ translateX: pumpPhTranslate }], backgroundColor: getSliderColor(pumpPh) }]}
                      >
                        <Icon name="power" size={16} color={getIconColor(pumpPh)} />
                      </Animated.View>
                    </Animated.View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* PPM Pump */}
            <View style={styles.pumpCard}>
              <Text style={styles.pumpCardTitle}>PPM Pump</Text>
              <View style={styles.pumpContent}>
                <View style={styles.pumpIconContainer}>
                  <View style={styles.pumpIconWrapper}>
                    <Icon name={pumpPpm === "ON" ? "pump" : "pump-off"} size={40} color={pumpPpm === "ON" ? "#4ade80" : "#94a3b8"} />
                  </View>
                </View>
                <View style={styles.pumpStatusContainer}>
                  <Text style={[styles.pumpStatus, pumpPpm === "ON" ? styles.statusOn : styles.statusOff]}>
                    {pumpPpm}
                  </Text>
                </View>
                <View style={styles.pumpToggleContainer}>
                  <TouchableOpacity
                    style={[styles.powerToggle, mode !== "manual" && styles.disabledToggle]}
                    onPress={togglePumpPpm}
                    activeOpacity={1}
                    disabled={mode !== "manual"}
                  >
                    <Animated.View style={[styles.powerToggleBackground, { backgroundColor: pumpPpmBackgroundColour }]}>
                      <Animated.View
                        style={[styles.powerSlider, { transform: [{ translateX: pumpPpmTranslate }], backgroundColor: getSliderColor(pumpPpm) }]}
                      >
                        <Icon name="power" size={16} color={getIconColor(pumpPpm)} />
                      </Animated.View>
                    </Animated.View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>

        {mode === "auto" && (
          <Text style={styles.autoText}>Kontrol pH & PPM dilakukan otomatis oleh ESP32.</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default IoTDashboard;