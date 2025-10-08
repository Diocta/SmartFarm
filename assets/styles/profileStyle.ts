import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f5", // Latar belakang abu-abu muda
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f5",
  },
  // Kartu untuk informasi profil
  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 25,
    alignItems: "center",
    marginBottom: 20,
    // Efek bayangan untuk iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Efek bayangan untuk Android
    elevation: 5,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50, // Membuat gambar menjadi lingkaran
    marginBottom: 15,
    borderWidth: 3,
    borderColor: "#007AFF",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: "#828282", // Warna abu-abu yang lebih lembut
  },
  // Kartu untuk tombol-tombol aksi
  actionsCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    // Efek bayangan
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2", // Garis pemisah tipis
  },
  actionButtonText: {
    flex: 1, // Agar teks mengisi ruang yang tersedia
    marginLeft: 15,
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  logoutText: {
    color: "#EB5757", // Warna merah untuk teks logout
  },
});

export default styles;