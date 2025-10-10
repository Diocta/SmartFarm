// Welcome.tsx
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { useRouter } from "expo-router";
import styles from "../../assets/styles/welcomeStyle";

export default function Welcome() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("../../assets/images/headerlogin.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.subtitle}>Lettura</Text>
        <Text style={styles.title}>
          Your Intelligent Partner for Smarter Harvest
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/auth/login")}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonOutline]}
          onPress={() => router.push("/auth/register")}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}