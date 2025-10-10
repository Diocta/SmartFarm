import React from "react";
import { Tabs } from "expo-router";
import { Animated } from "react-native";
import { Feather, FontAwesome, AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: "#163832",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: "#ddd",
          height: 60,
          paddingBottom: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 4,
        },
      }}
    >
      {/* Home */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Animated.View
              style={{
                transform: [{ scale: focused ? 1.2 : 1 }],
              }}
            >
              <Feather name="home" size={24} color={color} />
            </Animated.View>
          ),
        }}
      />

      {/* Data Chart */}
      <Tabs.Screen
        name="data"
        options={{
          title: "Data Chart",
          tabBarIcon: ({ color, focused }) => (
            <Animated.View
              style={{
                transform: [{ scale: focused ? 1.2 : 1 }],
              }}
            >
              <AntDesign name="bar-chart" size={24} color={color} />
            </Animated.View>
          ),
        }}
      />

      {/* News */}
      <Tabs.Screen
        name="news"
        options={{
          title: "News",
          tabBarIcon: ({ color, focused }) => (
            <Animated.View
              style={{
                transform: [{ scale: focused ? 1.2 : 1 }],
              }}
            >
              <FontAwesome name="newspaper-o" size={24} color={color} />
            </Animated.View>
          ),
        }}
      />

      {/* Settings */}
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, focused }) => (
            <Animated.View
              style={{
                transform: [{ scale: focused ? 1.2 : 1 }],
              }}
            >
              <Feather name="settings" size={24} color={color} />
            </Animated.View>
          ),
        }}
      />

      {/* IoT Dashboard */}
      <Tabs.Screen
        name="iot-dashboard"
        options={{
          title: "IoT Dashboard",
          tabBarIcon: ({ color, focused }) => (
            <Animated.View
              style={{
                transform: [{ scale: focused ? 1.2 : 1 }],
              }}
            >
              <MaterialCommunityIcons name="gauge" size={24} color={color} />
            </Animated.View>
          ),
        }}
      />

      {/* 🔹 Profile (paling kanan + animasi) */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <Animated.View
              style={{
                transform: [{ scale: focused ? 1.25 : 1 }],
              }}
            >
              <Feather name="user" size={24} color={color} />
            </Animated.View>
          ),
        }}
      />
    </Tabs>
  );
}
