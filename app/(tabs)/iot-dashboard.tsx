import { Buffer } from "buffer";
import mqtt, { MqttClient } from "mqtt";
import process from "process";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import "react-native-get-random-values";
// @ts-ignore
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from "../../assets/styles/iot-dashboard.styles";

(global as any).Buffer = Buffer;
(global as any).process = process;

const IoTDashboard: React.FC = () => {
  const [client, setClient] = useState<MqttClient | null>(null);
  const [ph, setPh] = useState<number>(0);
  const [ppm, setPpm] = useState<number>(0);
  const [pumpPpm, setPumpPpm] = useState<"ON" | "OFF">("OFF");
  const [pumpPh, setPumpPh] = useState<"ON" | "OFF">("OFF");
  const [mode, setMode] = useState<"manual" | "auto">("manual");

  useEffect(() => {
    const mqttClient = mqtt.connect("wss://mqtt-dashboard.com:8884/mqtt");

    mqttClient.on("connect", () => {
      console.log("✅ Connected to MQTT broker");
      mqttClient.subscribe("hydroponic/data/#");
      mqttClient.subscribe("hydroponic/mode");
    });

    mqttClient.on("message", (topic: string, message: Buffer) => {
      const msg = message.toString();
      if (topic === "hydroponic/data/ph") setPh(parseFloat(msg));
      if (topic === "hydroponic/data/ppm") setPpm(parseFloat(msg));
      if (topic === "hydroponic/data/pump_ppm") setPumpPpm(msg as "ON" | "OFF");
      if (topic === "hydroponic/data/pump_ph") setPumpPh(msg as "ON" | "OFF");
      if (topic === "hydroponic/mode") setMode(msg as "manual" | "auto");
    });

    setClient(mqttClient);

    return (): void => {
      mqttClient.end();
    };
  }, []);

  const changeMode = (newMode: "manual" | "auto") => {
    if (client) {
      client.publish("hydroponic/mode", newMode);
      setMode(newMode);
    }
  };

  const togglePumpPpm = () => {
    if (client && mode === "manual") {
      const newStatus = pumpPpm === "ON" ? "OFF" : "ON";
      client.publish("hydroponic/control/pump_ppm", newStatus);
      setPumpPpm(newStatus);
    }
  };

  const togglePumpPh = () => {
    if (client && mode === "manual") {
      const newStatus = pumpPh === "ON" ? "OFF" : "ON";
      client.publish("hydroponic/control/pump_ph", newStatus);
      setPumpPh(newStatus);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🌱 Lettura IoT Dashboard</Text>

      {/* Data pH */}
      <View style={styles.cardHighlight}>
        <Text style={styles.cardTitle}>pH Value</Text>
        <View style={styles.sensorRow}>
          <View style={styles.sensorBox}>
            <Icon
              name="water-pH"
              size={24}
              color="#daf1de"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.sensorValue}>{ph.toFixed(2)}</Text>
            <Text style={styles.sensorLabel}>pH</Text>
          </View>
        </View>
      </View>

      {/* Data PPM */}
      <View style={styles.cardHighlight}>
        <Text style={styles.cardTitle}>PPM Value</Text>
        <View style={styles.sensorRow}>
          <View style={styles.sensorBox}>
            <Icon
              name="gauge"
              size={24}
              color="#daf1de"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.sensorValue}>{ppm.toFixed(0)}</Text>
            <Text style={styles.sensorLabel}>PPM</Text>
          </View>
        </View>
      </View>

      {/* Mode */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>⚙️ Mode</Text>
        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.modeButton, mode === "manual" && styles.activeButton]}
            onPress={() => changeMode("manual")}
          >
            <Text style={[styles.buttonText, mode === "manual" && styles.activeText]}>
              Manual
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.modeButton, mode === "auto" && styles.activeButton]}
            onPress={() => changeMode("auto")}
          >
            <Text style={[styles.buttonText, mode === "auto" && styles.activeText]}>
              Auto
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.currentMode}>
          Mode sekarang: <Text style={{ fontWeight: "bold" }}>{mode}</Text>
        </Text>
      </View>

      {/* Kontrol */}
      <View style={styles.card}>
        {mode === "manual" ? (
          <>
            <Text style={styles.cardTitle}>🕹️ Kontrol Manual</Text>
            <TouchableOpacity
              style={[styles.controlButton, pumpPpm === "ON" ? styles.stopButton : styles.startButton]}
              onPress={togglePumpPpm}
            >
              <Text style={styles.controlText}>
                {pumpPpm === "ON" ? "Matikan Pompa PPM" : "Nyalakan Pompa PPM"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.controlButton, pumpPh === "ON" ? styles.stopButton : styles.startButton]}
              onPress={togglePumpPh}
            >
              <Text style={styles.controlText}>
                {pumpPh === "ON" ? "Matikan Pompa pH" : "Nyalakan Pompa pH"}
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.cardTitle}>🤖 Mode Otomatis</Text>
            <Text style={styles.autoText}>
              Kontrol pH & PPM dilakukan otomatis oleh ESP32.
            </Text>
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default IoTDashboard;
