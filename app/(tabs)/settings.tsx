// app/(tabs)/settings.tsx
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import mqtt, { MqttClient } from "mqtt";
import { styles } from "../../assets/styles/settings.styles";

const Settings: React.FC = () => {
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");
  const [client, setClient] = useState<MqttClient | null>(null);

  React.useEffect(() => {
    const mqttClient = mqtt.connect("wss://mqtt-dashboard.com:8884/mqtt");

    mqttClient.on("connect", () => {
      console.log("✅ Connected to MQTT broker (Settings)");
    });

    setClient(mqttClient);

    return () => {
      mqttClient.end();
    };
  }, []);

  const saveWifiConfig = () => {
    if (client && ssid && password) {
      const wifiConfig = JSON.stringify({ ssid, password });
      client.publish("hydroponic/wifi/config", wifiConfig);

      Alert.alert("✅ WiFi Config Terkirim", `SSID: ${ssid}`);
      setSsid("");
      setPassword("");
    } else {
      Alert.alert("⚠️ Lengkapi Data", "Mohon isi SSID dan Password");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⚙️ WiFi Settings</Text>

      <Text style={styles.label}>SSID WiFi</Text>
      <TextInput
        style={styles.input}
        placeholder="Masukkan SSID WiFi"
        value={ssid}
        onChangeText={setSsid}
      />

      <Text style={styles.label}>Password WiFi</Text>
      <TextInput
        style={styles.input}
        placeholder="Masukkan Password WiFi"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.saveButton} onPress={saveWifiConfig}>
        <Text style={styles.saveButtonText}>Simpan & Kirim</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Settings;
