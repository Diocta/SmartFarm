import { View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../../assets/styles/registerStyle";
import API from "../../api";

const GoogleLogo = require("../../assets/images/google.png");

export default function Register() {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleRegister = async () => {
    if (!username || !email || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      const res = await API.post("/auth/register", { username, email, password });

      if (res.status === 201) {
        Alert.alert("Success", "Account created successfully!", [
          {
            text: "Go to Login",
            onPress: () => router.replace("/auth/login"), // ⬅️ langsung arahkan ke login.tsx
          },
        ]);
      } else {
        Alert.alert("Notice", res.data?.message || "Registration completed.");
      }
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        (err.message?.includes("Network") ? "Cannot connect to server" : "Registration failed");
      Alert.alert("Register Failed", msg);
    }
  };

  const handleGoogleRegister = () => {
    console.log("Google Register clicked");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <Text style={styles.subtitle}>Create your new account</Text>

      {/* USERNAME */}
      <View style={styles.inputWrapper}>
        <View style={styles.inputRow}>
          <FontAwesome name="user" size={22} color="black" />
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            placeholderTextColor="#555"
          />
        </View>
      </View>

      {/* EMAIL */}
      <View style={styles.inputWrapper}>
        <View style={styles.inputRow}>
          <MaterialIcons name="email" size={22} color="black" />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="#555"
          />
        </View>
      </View>

      {/* PASSWORD */}
      <View style={styles.inputWrapper}>
        <View style={styles.inputRow}>
          <FontAwesome name="lock" size={22} color="black" />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#555"
          />
        </View>
      </View>

      {/* REGISTER BUTTON */}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      {/* OR CONTINUE WITH */}
      <View style={styles.dividerWrapper}>
        <View style={styles.line} />
        <Text style={styles.dividerText}>Or Continue With</Text>
        <View style={styles.line} />
      </View>

      {/* GOOGLE BUTTON */}
      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleRegister}>
        <Image source={GoogleLogo} style={styles.googleIcon} />
        <Text style={styles.googleText}>Continue with Google</Text>
      </TouchableOpacity>

      {/* FOOTER */}
      <Text style={styles.footer}>
        Already have an account?{" "}
        <Text style={styles.link} onPress={() => router.push("/auth/login")}>
          Login
        </Text>
      </Text>
    </View>
  );
}
