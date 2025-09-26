import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
    color: "#163832",
  },

  // Card default
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  cardHighlight: {
    backgroundColor: "#8eb69b",
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 10,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 16,
    color: "#1e293b",
  },

  // Sensor card
  sensorRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  sensorBox: {
    alignItems: "center",
  },
  sensorValue: {
    fontSize: 32,
    fontWeight: "700",
    color: "#fff",
  },
  sensorLabel: {
    fontSize: 15,
    color: "#e0f2fe",
    marginTop: 4,
  },

  // Mode
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 12,
  },
  modeButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#8eb69b",
    backgroundColor: "#fff",
  },
  activeButton: {
    backgroundColor: "#8eb69b",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#8eb69b",
  },
  activeText: {
    color: "#fff",
  },
  currentMode: {
    textAlign: "center",
    marginTop: 8,
    fontSize: 15,
    color: "#475569",
  },

  // Kontrol
  controlButton: {
    paddingVertical: 16,
    borderRadius: 14,
    marginTop: 14,
    alignItems: "center",
  },
  startButton: {
    backgroundColor: "#8eb69b",
  },
  stopButton: {
    backgroundColor: "#ef4444",
  },
  controlText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  autoText: {
    fontSize: 15,
    color: "#8eb69b",
  },
});
