import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 120,
    backgroundColor: "#DAF1DE",
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#051F20",
    marginBottom: 5,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#051F20",
    opacity: 0.5,
    marginBottom: 75,
    textAlign: "center",
  },
  inputWrapper: {
    marginBottom: 15,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#8EB69B",
    borderRadius: 15,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    padding: 12,
    marginLeft: 8,
  },
  button: {
    backgroundColor: "#0B2B26",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 15,
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  dividerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#8EB69B",
  },
  dividerText: {
    marginHorizontal: 10,
    color: "#051F20",
    fontSize: 14,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 12,
    borderRadius: 25,
    marginBottom: 20,
  },
  googleIcon: {
    width: 22,
    height: 22,
    marginRight: 10,
  },
  googleText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#0B2B26",
  },
  footer: {
    textAlign: "center",
    fontSize: 14,
    color: "#051F20",
  },
  link: {
    color: "#235247",
    fontWeight: "500",
  },
});

export default styles;
