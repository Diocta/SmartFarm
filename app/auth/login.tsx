import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Svg, { Path } from "react-native-svg"; // ✅ untuk lekukan
import styles from "../../assets/styles/loginStyle";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = () => {
    if (email && password) {
      router.replace("/(tabs)");
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
        {/* Lekukan putih */}
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
            fill="#fff"
            transform="scale(1, -1) translate(0, -120)"
          />
        </Svg>
      </View>

      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.subtitle}>Login to your account</Text>

      {/* EMAIL INPUT */}
      <View style={styles.inputWrapper}>
        <Ionicons
          name="person-outline"
          size={20}
          color="#12372A"
          style={styles.icon}
        />
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
        <Ionicons
          name="lock-closed-outline"
          size={20}
          color="#12372A"
          style={styles.icon}
        />
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
          Sign Up
        </Text>
      </Text>
    </View>
  );
}
