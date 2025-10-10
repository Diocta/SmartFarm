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
    color: "#1e293b",
    // Gaya margin-bottom dipindahkan ke cardHeader untuk kontrol yang lebih baik
  },

  // --- Mode Switch & Header General ---
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12, // Disesuaikan agar konsisten
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

  // --- Camera Styles (FIXED) ---
  cameraContainer: {
    width: "100%",
    height: 210, // Fixed height
    backgroundColor: "#1a1a1a",
    borderRadius: 16,
    overflow: "hidden",
    marginTop: 8,
    position: "relative",
    borderWidth: 2,
    borderColor: "#e2e8f0",
  },
  cameraImage: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000", // Pastikan background hitam
  },
  
  // BARU: Tombol Stream di dalam card (pojok kanan atas)
  streamButtonInside: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ef4444',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 12,
    gap: 6,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 5,
    zIndex: 100, // Di atas video tapi di bawah loading
  },
  streamButtonInsideActive: {
    backgroundColor: '#dc2626',
  },
  streamButtonInsideText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
  
  // Style untuk tombol disabled (saat disconnected)
  disabledButton: {
    backgroundColor: '#cbd5e1',
    opacity: 0.6,
  },
  noImagePlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    paddingHorizontal: 20,
  },
  noImageText: {
    color: "#64748b",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 12,
  },
  noImageSubtext: {
    color: "#94a3b8",
    fontSize: 12,
    marginTop: 4,
    textAlign: "center",
  },
  // FIXED: Loading overlay dengan zIndex lebih tinggi
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999, // Sangat tinggi agar di atas semua elemen
  },
  loadingText: {
    color: "#fff",
    marginTop: 12,
    fontSize: 14,
    fontWeight: "500",
  },

  // HAPUS: Styles lama yang tidak dipakai lagi
  // cameraButtonsRow, captureButton, streamButton, streamButtonActive, captureButtonText sudah tidak dipakai

  cameraInfo: {
    marginTop: 10,
    alignItems: "center",
  },
  streamingBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#dc2626",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  streamingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#fff",
  },
  streamingText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  imageTimestamp: {
    color: "#64748b",
    fontSize: 12,
    fontStyle: "italic",
    marginTop: 10,
    textAlign: "center",
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

  // --- Edit Button Styles ---
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#ecfdf5',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d1fae5',
  },
  editButtonText: {
    marginLeft: 4,
    color: '#059669',
    fontSize: 13,
    fontWeight: '700',
  },

  // --- Modal Styles ---
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    width: '90%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    elevation: 15,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 20,
    color: '#163832',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingBottom: 10,
  },
  inputLabel: {
    fontSize: 13,
    color: '#4b5563',
    marginTop: 10,
    marginBottom: 5,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 10,
    color: '#1f2937',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  modalButton: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
    marginLeft: 10,
    minWidth: 90,
    alignItems: 'center',
  },
  modalButtonCancel: {
    backgroundColor: '#6b7280',
  },
  modalButtonSave: {
    backgroundColor: '#10b981',
  },
  modalButtonText: {
    fontWeight: '700',
    color: 'white',
    fontSize: 14,
  },

  // --- Health Card Styles ---
  healthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  healthBadge: {
    minWidth: 64,
    minHeight: 64,
    borderRadius: 12,
    backgroundColor: '#10b981',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  healthBadgeText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 13,
  },
  healthStatusLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1f2937',
  },
  healthTips: {
    fontSize: 13,
    color: '#475569',
    marginTop: 6,
  },

  // --- Error Overlay (FIXED) ---
  errorOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    zIndex: 998, // Di bawah loading tapi di atas WebView
  },
  errorText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
  },
  errorSubtext: {
    color: '#cbd5e1',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
});