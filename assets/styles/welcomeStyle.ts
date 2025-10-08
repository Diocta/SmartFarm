// welcomeStyle.ts
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.55)",
    paddingHorizontal: 30,
    paddingVertical: 50,
  },
  subtitle: {
    fontSize: 34,
    color: "#DAF1DE",
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    letterSpacing: 1.5,
  },
  title: {
    fontSize: 18,
    color: "#E6F2E1",
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 50,
    lineHeight: 24,
  },
  button: {
    width: "80%",
    backgroundColor: "#0B2B26",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // untuk Android
  },
  buttonText: {
    color: "#DAF1DE",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  buttonOutline: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#DAF1DE",
  },
  buttonOutlineText: {
    color: "#DAF1DE",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});

export default styles;