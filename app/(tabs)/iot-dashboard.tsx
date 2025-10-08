// IoTDashboard.tsx
import { Buffer } from "buffer";
import mqtt, { MqttClient } from "mqtt";
import process from "process";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Animated,
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import "react-native-get-random-values";
// @ts-ignore
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from "../../assets/styles/iot-dashboard.styles";

(global as any).Buffer = Buffer;
(global as any).process = process;

// Backend Configuration
const BACKEND_URL = "http://10.218.18.16:3000";

// Definisikan Tipe Data Tanaman
interface PlantData {
  name: string;
  count: number;
  standardPhMin: number;
  standardPhMax: number;
  plantingDate: string;
  hss: number; // Tambahkan field HSS dari backend
}

// Data default / fallback
const DEFAULT_PLANT_DATA: PlantData = {
  name: "Selada (Lettuce)",
  count: 24,
  standardPhMin: 5.5,
  standardPhMax: 6.5,
  plantingDate: '2025-09-26',
  hss: 0, // Default HSS
};

// Regex sederhana untuk validasi format tanggal YYYY-MM-DD
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

// Helper function tidak digunakan lagi - HSS dari backend
// const calculateHSS = ... (DIHAPUS)


const IoTDashboard: React.FC = () => {
  // State Dinamis untuk Data Tanaman
  const [plant, setPlant] = useState<PlantData>(DEFAULT_PLANT_DATA);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPlant, setEditingPlant] = useState<PlantData>(DEFAULT_PLANT_DATA);

  // State dan Refs Lainnya
  const [client, setClient] = useState<MqttClient | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [ph, setPh] = useState<number>(0);
  const [ppm, setPpm] = useState<number>(0);
  const [pumpPpm, setPumpPpm] = useState<"ON" | "OFF">("OFF");
  const [pumpPh, setPumpPh] = useState<"ON" | "OFF">("OFF");
  const [mode, setMode] = useState<"manual" | "auto">("manual");
  const [cameraImage, setCameraImage] = useState<string | null>(null);
  const [isLoadingImage, setIsLoadingImage] = useState<boolean>(false);
  const [lastImageUpdate, setLastImageUpdate] = useState<Date | null>(null);
  const [streamUrl, setStreamUrl] = useState<string>("");
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [esp32camIP, setEsp32camIP] = useState<string>("10.89.200.248"); 

  const pumpPhAnimation = useRef(new Animated.Value(pumpPh === "ON" ? 1 : 0)).current;
  const pumpPpmAnimation = useRef(new Animated.Value(pumpPpm === "ON" ? 1 : 0)).current;
  const modeSwitchAnimation = useRef(new Animated.Value(mode === "auto" ? 1 : 0)).current;

  // --- Calculated Values ---
  // HSS diambil langsung dari state plant yang didapat dari backend
  const plantAgeHSS = plant.hss;
  
  const getStandardPPM = (hss: number) => {
    if (hss >= 8 && hss <= 17) return 300;
    if (hss >= 18 && hss <= 33) return 700;
    if (hss >= 34 && hss <= 45) return 800;
    return 0;
  };
  const standardPpm = getStandardPPM(plantAgeHSS);

  // --- Health heuristic (UI only) ---
  const phOkOverall = ph >= plant.standardPhMin && ph <= plant.standardPhMax;
  const ppmOkOverall = standardPpm > 0 ? (ppm >= standardPpm * 0.9 && ppm <= standardPpm * 1.1) : false;

  let healthBadgeText = '';
  let healthStatusLabel = '';
  let healthTip = '';
  let healthBadgeColor = '#10b981';

  if (phOkOverall && ppmOkOverall) {
    healthBadgeText = 'Healthy';
    healthStatusLabel = 'Healthy';
    healthTip = 'Tanaman sehat. Lanjutkan pemantauan rutin dan jaga kondisi nutrisi.';
    healthBadgeColor = '#10b981';
  } else if (!phOkOverall && !ppmOkOverall) {
    healthBadgeText = 'Unstable';
    healthStatusLabel = 'Unstable (Check pH & Nutrients)';
    healthTip = 'Periksa sistem nutrisi dan pH. Lakukan flush & restore nutrisi sesuai standar.';
    healthBadgeColor = '#f59e0b';
  } else if (!phOkOverall) {
    healthBadgeText = 'pH';
    healthStatusLabel = 'Possible Bacterial Issue (pH anomaly)';
    healthTip = 'pH di luar standar — periksa dan sesuaikan larutan pH. Gunakan buffer atau adjuster pH.';
    healthBadgeColor = '#ef4444';
  } else {
    healthBadgeText = 'PPM';
    healthStatusLabel = 'Possible Fungal/Nutrient Issue (PPM anomaly)';
    healthTip = 'Konsentrasi nutrisi tidak sesuai — sesuaikan PPM perlahan, periksa tanda layu atau bercak pada daun.';
    healthBadgeColor = '#f97316';
  }


  // --- API/Database Functions ---

  // 1. Ambil data tanaman terbaru dari DB - HSS dihitung di backend
  const fetchPlantData = useCallback(async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/plant-data`);
      const data = await response.json();

      if (data.success && data.plant) {
        // Normalisasi tanggal ke format YYYY-MM-DD
        let normalizedDate = DEFAULT_PLANT_DATA.plantingDate;
        if (data.plant.plantingDate) {
          const rawDate = new Date(data.plant.plantingDate);
          if (!isNaN(rawDate.getTime())) {
            const year = rawDate.getUTCFullYear();
            const month = String(rawDate.getUTCMonth() + 1).padStart(2, '0');
            const day = String(rawDate.getUTCDate()).padStart(2, '0');
            normalizedDate = `${year}-${month}-${day}`;
          }
        }
        
        const fetchedPlant = {
          name: data.plant.name || DEFAULT_PLANT_DATA.name,
          count: Number(data.plant.count) || DEFAULT_PLANT_DATA.count,
          standardPhMin: Number(data.plant.standardPhMin) || DEFAULT_PLANT_DATA.standardPhMin,
          standardPhMax: Number(data.plant.standardPhMax) || DEFAULT_PLANT_DATA.standardPhMax,
          plantingDate: normalizedDate,
          hss: Number(data.plant.hss) || 0, // Ambil HSS dari backend
        };
        
        console.log("📊 Data fetched from backend:", fetchedPlant); // Debug log
        
        setPlant(fetchedPlant);
        setEditingPlant(fetchedPlant);
      } else {
        console.warn("Gagal mengambil data plant atau data kosong:", data.message);
      }
    } catch (error) {
      console.error("Error fetching plant data:", error);
    }
  }, []);

  // 2. Kirim data tanaman yang diubah ke DB
  const updatePlantData = useCallback(async () => {
    // Validasi sederhana
    if (editingPlant.count <= 0) {
        Alert.alert("Gagal", "Jumlah Unit harus angka positif.");
        return;
    }
    
    // Validasi tanggal
    if (!DATE_REGEX.test(editingPlant.plantingDate)) {
        Alert.alert("Gagal", "Format Tanggal Tanam harus YYYY-MM-DD yang valid.");
        return;
    }
    
    try {
      const response = await fetch(`${BACKEND_URL}/api/plant-data`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editingPlant.name,
          count: editingPlant.count,
          standardPhMin: editingPlant.standardPhMin,
          standardPhMax: editingPlant.standardPhMax,
          plantingDate: editingPlant.plantingDate, 
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setPlant(editingPlant);
        setIsModalVisible(false);
        Alert.alert("Sukses", "Data tanaman berhasil diperbarui.");
      } else {
        Alert.alert("Gagal", `Gagal memperbarui data: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error updating plant data:", error);
      Alert.alert("Error", "Gagal terhubung ke backend untuk update data.");
    }
  }, [editingPlant]);

  // Fungsi untuk membuka modal edit
  const openEditModal = () => {
    setEditingPlant(plant);
    setIsModalVisible(true);
  };
  
  // --- useEffects ---
  
  // Initial fetch untuk data tanaman dan setup MQTT
  useEffect(() => {
    fetchPlantData();
    
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
      
      if (topic === "hydroponic/camera/image") {
        try {
          const base64Image = msg.startsWith("data:image") ? msg : `data:image/jpeg;base64,${msg}`;
          setCameraImage(base64Image);
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
  }, [fetchPlantData]);

  // Auto fetch dari database setiap 10 detik
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isStreaming && isConnected) {
        if (Date.now() % 60000 < 10000) { 
            fetchPlantData();
        }
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [isStreaming, isConnected, fetchPlantData]);

  // Animasi pumps dan mode
  useEffect(() => {
    Animated.timing(pumpPhAnimation, { toValue: pumpPh === "ON" ? 1 : 0, duration: 300, useNativeDriver: false }).start();
  }, [pumpPh]);

  useEffect(() => {
    Animated.timing(pumpPpmAnimation, { toValue: pumpPpm === "ON" ? 1 : 0, duration: 300, useNativeDriver: false }).start();
  }, [pumpPpm]);

  useEffect(() => {
    Animated.timing(modeSwitchAnimation, { toValue: mode === "auto" ? 1 : 0, duration: 300, useNativeDriver: false }).start();
  }, [mode]);

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

  const requestNewImage = () => {
    if (client && isConnected) {
      setIsLoadingImage(true);
      client.publish("hydroponic/camera/capture", "REQUEST");
    }
  };

  const toggleStreaming = () => {
    if (isStreaming) {
      setStreamUrl("");
      setIsStreaming(false);
    } else {
      setStreamUrl(`http://${esp32camIP}:81/stream`);
      setIsStreaming(true);
    }
  };

  // --- Helpers ---
  const getPhStatus = (value: number) => {
    if (value >= plant.standardPhMin && value <= plant.standardPhMax) {
      return "Normal";
    }
    return value < plant.standardPhMin ? "Too Acidic" : "Too Basic";
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


  // --- Anim Interpolations ---
  const modeSliderTranslate = modeSwitchAnimation.interpolate({ inputRange: [0, 1], outputRange: [2, 20] });
  const modeBackgroundColour = modeSwitchAnimation.interpolate({ inputRange: [0, 1], outputRange: ["#e5e7eb", "#8eb69b"] });
  const pumpPhTranslate = pumpPhAnimation.interpolate({ inputRange: [0, 1], outputRange: [2, 26] });
  const pumpPhBackgroundColour = pumpPhAnimation.interpolate({ inputRange: [0, 1], outputRange: ["#e5e7eb", "#4ade80"] });
  const pumpPpmTranslate = pumpPpmAnimation.interpolate({ inputRange: [0, 1], outputRange: [2, 26] });
  const pumpPpmBackgroundColour = pumpPpmAnimation.interpolate({ inputRange: [0, 1], outputRange: ["#e5e7eb", "#4ade80"] });

  const getSliderColor = (pumpStatus: "ON" | "OFF") => (pumpStatus === "ON" ? "#22c55e" : mode === "manual" ? "#ffffff" : "#e5e7eb");
  const getIconColor = (pumpStatus: "ON" | "OFF") => (pumpStatus === "ON" ? "#fff" : mode === "manual" ? "#94a3b8" : "#ccc");

  // --- Render ---
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🌱 Hydroponic Dashboard</Text>

      {/* Device Status Card */}
      <View style={[styles.card, isConnected ? styles.cardConnected : styles.cardDisconnected]}>
        <Text style={styles.cardTitle}>Device Status</Text>
        <View style={styles.deviceStatusRow}>
          <Icon name={isConnected ? "wifi" : "wifi-off"} size={20} color={isConnected ? "#10b981" : "#ef4444"} />
          <Text style={styles.deviceStatusText}>
            {isConnected ? "Connected (Live)" : "Disconnected"}
          </Text>
        </View>
      </View>

      {/* Camera Card */}
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
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>🥬 Informasi Tanaman</Text>
          <TouchableOpacity 
            onPress={openEditModal}
            style={styles.editButton}
          >
            <Icon name="pencil" size={20} color="#059669" />
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Sayuran</Text>
            <Text style={styles.infoValue}>{plant.name}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Usia</Text>
            <Text style={styles.infoValue}>{plantAgeHSS} HSS</Text> 
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Jumlah</Text>
            <Text style={styles.infoValue}>{plant.count} unit</Text>
          </View>
        </View>
        <View style={styles.infoDetail}>
          <Text style={styles.infoDetailLabel}>Standar PH:</Text>
          <Text style={styles.infoDetailValue}>
            {plant.standardPhMin} - {plant.standardPhMax}
          </Text>
        </View>
        <View style={styles.infoDetail}>
          <Text style={styles.infoDetailLabel}>Standar PPM:</Text>
          <Text style={styles.infoDetailValue}>
            {standardPpm} ppm (usia {plantAgeHSS} HSS)
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
      
      {/* MODAL EDIT DATA TANAMAN */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Data Tanaman</Text>
            
            {/* Input Nama */}
            <Text style={styles.inputLabel}>Nama Tanaman</Text>
            <TextInput
              style={styles.input}
              value={editingPlant.name}
              onChangeText={(text) => setEditingPlant({ ...editingPlant, name: text })}
            />

            {/* Input Tanggal Tanam */}
            <Text style={styles.inputLabel}>Tanggal Tanam (YYYY-MM-DD)</Text>
            <TextInput
              style={[styles.input, !DATE_REGEX.test(editingPlant.plantingDate) && { borderColor: 'red' }]}
              value={editingPlant.plantingDate}
              onChangeText={(text) => setEditingPlant({ ...editingPlant, plantingDate: text })}
              placeholder="Contoh: 2025-09-26"
              keyboardType="default"
              maxLength={10}
            />
            
            {/* Input Count */}
            <Text style={styles.inputLabel}>Jumlah Unit</Text>
            <TextInput
              style={styles.input}
              value={String(editingPlant.count)}
              onChangeText={(text) => setEditingPlant({ ...editingPlant, count: Number(text.replace(/[^0-9]/g, '')) || 0 })}
              keyboardType="numeric"
            />
            
            {/* Input PH Min */}
            <Text style={styles.inputLabel}>Standard PH Minimum</Text>
            <TextInput
              style={styles.input}
              value={String(editingPlant.standardPhMin)}
              onChangeText={(text) => setEditingPlant({ ...editingPlant, standardPhMin: Number(text) || 0 })}
              keyboardType="numeric"
            />
            
            {/* Input PH Max */}
            <Text style={styles.inputLabel}>Standard PH Maximum</Text>
            <TextInput
              style={styles.input}
              value={String(editingPlant.standardPhMax)}
              onChangeText={(text) => setEditingPlant({ ...editingPlant, standardPhMax: Number(text) || 0 })}
              keyboardType="numeric"
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonCancel]}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonSave]}
                onPress={updatePlantData}
              >
                <Text style={styles.modalButtonText}>Simpan</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default IoTDashboard;