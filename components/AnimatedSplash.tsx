import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

export default function AnimatedSplash({ onFinish }: { onFinish: () => void }) {
  let animation: LottieView | null = null;

  useEffect(() => {
    // Jalankan callback setelah animasi selesai
    const timer = setTimeout(() => {
      onFinish();
    }, 4000); // lama splash 4 detik (sesuaikan dengan panjang animasi)

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <View style={styles.container}>
      <LottieView
        ref={(ref) => {
          animation = ref;
        }}
        source={require("@/assets/images/lottie/lettucesplash.json")}
        autoPlay
        style={{ width: 200, height: 200 }}
        speed={0.6}        // 1 = normal, < 1 lebih lambat (0.5 = setengah kecepatan)
        onAnimationFinish={() => onFinish()} // alternatif selain setTimeout
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // samakan dengan tema
    justifyContent: "center",
    backgroundColor: "#fff",
    alignItems: "center",
  },
});
