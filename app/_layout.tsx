import { Stack, Slot } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, ActivityIndicator } from "react-native";
import AnimatedSplash from "@/components/AnimatedSplash";

export default function Layout() {
  const [isSplashDone, setIsSplashDone] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem("token");
      setIsLoggedIn(!!token);
      setLoading(false);
    };
    checkLogin();
  }, []);

  if (!isSplashDone) {
    return <AnimatedSplash onFinish={() => setIsSplashDone(true)} />;
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Kalau belum login → auth stack
  if (!isLoggedIn) {
    return (
      <Stack screenOptions={{ headerShown: false, animation: "fade" }}>
        <Stack.Screen name="auth/welcome" />
        <Stack.Screen name="auth/login" />
        <Stack.Screen name="auth/register" />
      </Stack>
    );
  }

  // Kalau sudah login → langsung ke (tabs)
  return <Slot />;
}
