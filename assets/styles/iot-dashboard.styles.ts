import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6", // Warna latar belakang terang
    padding: 18,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
    color: "#163832", // Warna judul gelap
  },

  // --- Card General Styles ---
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 18,
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
    padding: 22,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 10,
    elevation: 4,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    color: "#1e293b",
  },

  // --- Mode Switch ---
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  modeSwitch: {
    flexDirection: "row",
    alignItems: "center",
  },
  modeSwitchBackground: {
    width: 44,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    marginRight: 8,
  },
  modeSwitchSlider: {
    width: 20,
    height: 20,
    borderRadius: 10,
    position: "absolute",
    top: 2,
  },
  modeSwitchLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#94a3b8",
  },
  modeSwitchLabelActive: {
    color: "#8eb69b",
  },

  // --- Sensor Cards ---
  sensorCardsContainer: {
    flexDirection: "row",
    marginBottom: 18,
    marginHorizontal: -6,
  },
  cardHighlightHalf: {
    backgroundColor: "#8eb69b",
    borderRadius: 20,
    padding: 16,
    flex: 1,
    marginHorizontal: 6,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 10,
    elevation: 4,
  },
  sensorRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  sensorBox: {
    alignItems: "center",
    flex: 1,
  },
  sensorValue: {
    fontSize: 30,
    fontWeight: "700",
    color: "#fff",
  },
  sensorLabel: {
    fontSize: 14,
    color: "#e0f2fe",
    marginTop: 4,
    textAlign: "center",
  },

  // --- Pump Control ---
  pumpsContainer: {
    marginTop: 10,
  },
  pumpCardsContainer: {
    flexDirection: "row",
    marginHorizontal: -6,
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  pumpCard: {
    backgroundColor: "#f8fafc",
    borderRadius: 16,
    padding: 12,
    flex: 1,
    marginHorizontal: 6,
    marginBottom: 12,
    minHeight: 180,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    justifyContent: "space-between",
  },
  pumpCardTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    color: "#374151",
    textAlign: "center",
  },
  pumpContent: {
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 120,
  },
  pumpIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },

  pumpIconWrapper: {
  position: "relative",
  alignItems: "center",
  justifyContent: "center",
},

  pumpStatusContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  pumpToggleContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  pumpStatus: {
    fontSize: 13,
    fontWeight: "700",
    textAlign: "center",
  },

  // --- Power Toggle Switch ---
  powerToggle: {
    width: 56,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  powerToggleBackground: {
    width: 56,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
  },
  powerSlider: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },

  // --- Status Text Colors ---
  statusOn: {
    color: "#4ade80",
  },
  statusOff: {
    color: "#ef4444",
  },
  autoText: {
    fontSize: 14,
    color: "#8eb69b",
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 10,
  },

  // --- Device Status ---
  cardConnected: {
    borderColor: "#10b981",
    borderWidth: 1,
  },
  cardDisconnected: {
    borderColor: "#ef4444",
    borderWidth: 1,
  },
  deviceStatusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  deviceStatusText: {
    marginLeft: 8,
    fontSize: 15,
    fontWeight: "600",
    color: "#1f2937",
  },
  disabledToggle: {
    opacity: 0.4,
  },

  // --- Plant Info ---
  infoGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
    paddingHorizontal: 0,
  },
  infoItem: {
    alignItems: "center",
    padding: 6,
    flex: 1,
    marginHorizontal: 3,
    backgroundColor: "#f0fdf4",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#dcfce7",
  },
  infoLabel: {
    fontSize: 11,
    color: "#6b7280",
    textAlign: "center",
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#10b981",
    marginTop: 2,
    textAlign: "center",
  },
  infoDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
    flexWrap: "wrap",
  },
  infoDetailLabel: {
    fontSize: 14,
    color: "#4b5563",
    fontWeight: "500",
    flexShrink: 1,
    marginRight: 5,
  },
  infoDetailValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#10b981",
    flexShrink: 1,
    maxWidth: "60%",
    textAlign: "right",
  },
});
