import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons"; // Pastikan @expo/vector-icons terinstal
import API from "../../api";
import styles from "../../assets/styles/profileStyle";

export default function ProfileScreen() {
  const router = useRouter();
  const [user, setUser] = useState<{
    id: number;
    username: string;
    email: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          router.replace("/auth/login");
          return;
        }

        const res = await API.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(res.data);
      } catch (err) {
        console.log("Profile error:", err);
        Alert.alert("Error", "Gagal mengambil data profil");
        await AsyncStorage.removeItem("token");
        router.replace("/auth/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    // Menampilkan dialog konfirmasi sebelum logout
    Alert.alert(
      "Konfirmasi Logout", // Judul
      "Apakah Anda yakin ingin keluar?", // Pesan
      [
        // Tombol pertama: Batal
        {
          text: "Batal",
          onPress: () => console.log("Logout dibatalkan"),
          style: "cancel",
        },
        // Tombol kedua: Ya, Keluar
        {
          text: "Ya, Keluar",
          onPress: async () => {
            await AsyncStorage.removeItem("token");
            router.replace("/auth/welcome");
          },
          style: "destructive", 
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Kartu Informasi Profil */}
      <View style={styles.profileCard}>
        <Image
          source={{
            uri: "https://i.pravatar.cc/150",
          }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{user?.username || "Guest"}</Text>
        <Text style={styles.email}>{user?.email || "email@example.com"}</Text>
      </View>

      {/* Kartu Aksi */}
      <View style={styles.actionsCard}>
        {/* Tombol Ubah Password */}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => Alert.alert("Info", "Fitur ubah password belum dibuat")}
        >
          <Feather name="lock" size={20} color="#4F4F4F" />
          <Text style={styles.actionButtonText}>Ubah Password</Text>
          <Feather name="chevron-right" size={20} color="#BDBDBD" />
        </TouchableOpacity>

        {/* Tombol Logout */}
        <TouchableOpacity style={styles.actionButton} onPress={handleLogout}>
          <Feather name="log-out" size={20} color="#EB5757" />
          <Text style={[styles.actionButtonText, styles.logoutText]}>
            Logout
          </Text>
          <Feather name="chevron-right" size={20} color="#BDBDBD" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}