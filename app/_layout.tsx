// app/_layout.tsx
import { Drawer } from "expo-router/drawer";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, ActivityIndicator } from "react-native";

export default function Layout() {
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

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!isLoggedIn) {
    // Kalau belum login → tampilkan welcome + auth
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="auth/welcome" />
        <Stack.Screen name="auth/login" />
        <Stack.Screen name="auth/register" />
      </Stack>
    );
  }

  // Kalau sudah login → tampilkan drawer
  return (
    <Drawer>
      <Drawer.Screen name="index" options={{ title: "Home" }} />
      <Drawer.Screen name="explore" options={{ title: "Explore" }} />
      <Drawer.Screen name="screens/profile" options={{ title: "Profile" }} />
      <Drawer.Screen name="screens/data" options={{ title: "Data" }} />
      <Drawer.Screen name="screens/news" options={{ title: "News" }} />
    </Drawer>
  );
}
