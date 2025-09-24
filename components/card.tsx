// components/card.tsx
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

type Props = {
  title: string;
  content: string;
  image: any;
};

export const Frame = ({ title, content, image }: Props) => {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.cardImage} />
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{title}</Text>
        <Text numberOfLines={2}>{content}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#3a6f43",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    gap: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 4,
  },
});
