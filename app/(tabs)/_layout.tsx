import { Drawer } from "expo-router/drawer";
import React from "react";
import { IconSymbol } from "@/components/ui/icon-symbol";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';


export default function Layout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: true,
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          title: "Home",
          drawerIcon: ({ color, size }) => (
            <Feather name="home" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="data"
        options={{
          title: "Data Chart",
          drawerIcon: ({ color, size }) => (
            <AntDesign name="bar-chart" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="news"
        options={{
          title: "News",
          drawerIcon: ({ color, size }) => (
            <FontAwesome name="newspaper-o" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          title: "Profile",
          drawerIcon: ({ color, size }) => (
            <Feather name="user" size={24} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}
