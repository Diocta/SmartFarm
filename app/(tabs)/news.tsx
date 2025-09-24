import React from "react";
import { StyleSheet, Image, FlatList, Button } from "react-native";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Frame } from "@/components/card";

const news = [
  {
    id: "1",
    title: "Judul Berita 1",
    content: "Isi berita 1...",
    image: require("@/assets/images/icon.png"),
  },
  {
    id: "2",
    title: "Judul Berita 2",
    content: "Isi berita 2...",
    image: require("@/assets/images/icon.png"),
  },
  {
    id: "3",
    title: "Judul Berita 3",
    content: "Isi berita 3...",
    image: require("@/assets/images/icon.png"),
  },
];

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <FlatList
      data={news}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Frame title={item.title} content={item.content} image={item.image} />
      )}
      ListHeaderComponent={
        <>
          {/* Header gambar */}
          <Image
            source={require("@/assets/images/android-icon-background.png")}
            style={styles.headerImage}
          />

          {/* Judul */}
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">Smart Hidroponik Selada</ThemedText>
            <ThemedText type="subtitle">Berita & Informasi</ThemedText>
          </ThemedView>
        </>
      }
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  menuContainer: {
    padding: 10,
    alignItems: "flex-start",
  },
  headerImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  titleContainer: {
    padding: 16,
    alignItems: "center",
  },                   
});