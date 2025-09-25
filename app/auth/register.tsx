import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import styles from "../../assets/styles/registerStyle";

export default function Register() {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleRegister = () => {
    if (username && email && password) {
      router.replace("/(tabs)");
    }
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

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>
        Already have an account?{" "}
        <Text style={styles.link} onPress={() => router.push("/auth/login")}>
          Login
        </Text>
      </Text>
    </View>
  );
}
