// App.tsx
import 'react-native-gesture-handler';
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Text, View, Button } from "react-native";

// Import screens - sesuaikan path dengan project Anda
import NewsScreen from "@/app/(tabs)/news";
import NewsDetailScreen from "@/app/(tabs)/NewsDetailScreen";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Stack Navigator untuk News
function NewsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="NewsScreen" 
        component={NewsScreen}
        options={{ 
          title: 'Berita Terkini',
          headerShown: true 
        }}
      />
      <Stack.Screen 
        name="NewsDetail" 
        component={NewsDetailScreen}
        options={{ 
          title: 'Detail Berita',
          headerBackTitle: 'Kembali'
        }}
      />
    </Stack.Navigator>
  );
}

function HomeScreen({ navigation }: any) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home Screen</Text>
      <Button title="Open Menu" onPress={() => navigation.openDrawer()} />
      <Button 
        title="Go to News" 
        onPress={() => navigation.navigate('NewsStack')} 
      />
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Profile Screen</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerShown: true,
        }}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Berita" component={NewsStack} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}