import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#12372A",
    marginBottom: 5,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  inputWrapper: {
    marginBottom: 15,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DAF1DE",
    borderRadius: 15,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    padding: 12,
    marginLeft: 8,
  },
  button: {
    backgroundColor: "#12372A",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  footer: {
    textAlign: "center",
    fontSize: 14,
    color: "#666",
  },
  link: {
    color: "#3B7D3A",
    fontWeight: "500",
  },
});

export default styles;
