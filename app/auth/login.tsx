import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; 
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
      {/* HEADER IMAGE */}
      <View style={styles.headerContainer}>
        <Image
          source={require("../../assets/images/headerlogin.png")}
          style={styles.headerImage}
          resizeMode="cover"
        />
      </View>

      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.subtitle}>Login to your account</Text>

      {/* EMAIL INPUT */}
      <View style={styles.inputWrapper}>
        <Ionicons name="person-outline" size={20} color="#12372A" style={styles.icon} />
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
        <Ionicons name="lock-closed-outline" size={20} color="#12372A" style={styles.icon} />
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
