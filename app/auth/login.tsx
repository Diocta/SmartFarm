// frontend/app/auth/login.tsx
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Svg, { Path } from "react-native-svg"; 
import styles from "../../assets/styles/loginStyle";
import API from "../../api";  
import AsyncStorage from "@react-native-async-storage/async-storage"; 

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Email dan password harus diisi");
      return;
    }

    try {
      const res = await API.post("/auth/login", { email, password });
      const { token, user } = res.data;

      // ✅ simpan token ke AsyncStorage
      await AsyncStorage.setItem("token", token.toString());

      Alert.alert("Sukses", `Selamat datang ${user.username}`);
      router.replace("/(tabs)"); // masuk ke halaman utama
    } catch (err: any) {
      console.error("Login error:", err);
      Alert.alert("Login gagal", err.response?.data?.message || "Terjadi kesalahan");
    }
  };

  return (
    <View style={styles.container}>
      {/* HEADER dengan gambar + lekukan */}
      <View style={styles.headerContainer}>
        <Image
          source={require("../../assets/images/headerlogin.png")}
          style={styles.headerImage}
          resizeMode="cover"
        />
        <Svg
          height="100"
          width="100%"
          viewBox="0 0 720 120"
          style={styles.waveSvg}
          preserveAspectRatio="none"
        >
          <Path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,
               82.39-16.72,168.19-17.73,250.45-.39C823.78,31,
               906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,
               214.34,3V0H0V27.35A600.21,600.21,0,
               0,0,321.39,56.44Z"
            fill="#DAF1DE"
            transform="scale(1, -1) translate(0, -120)"
          />
        </Svg>
      </View>

      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.subtitle}>Login to your account</Text>

      {/* EMAIL INPUT */}
      <View style={styles.inputWrapper}>
        <MaterialIcons name="email" size={24} color="black" />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#555"
        />
      </View>

      {/* PASSWORD INPUT */}
      <View style={styles.inputWrapper}>
        <FontAwesome name="lock" size={24} color="black" />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#555"
        />
      </View>

      {/* OPTIONS */}
      <View style={styles.row}>
        <Text style={styles.link}>Remember Me</Text>
        <Text style={styles.link}>Forgot Password?</Text>
      </View>

      {/* LOGIN BUTTON */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* FOOTER */}
      <Text style={styles.footer}>
        Don’t have an account?{" "}
        <Text style={styles.link} onPress={() => router.push("/auth/register")}>
          Register
        </Text>
      </Text>
    </View>
  );
}
