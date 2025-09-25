import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },

  // header image
  headerContainer: {
    width: "100%",
    height: 180,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    overflow: "hidden", 
    marginBottom: 20,
  },
  headerImage: {
    width: "100%",
    height: "100%",
  },

  title: {
    fontSize: 28,
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

  // input + icon
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DAF1DE",
    borderRadius: 15,
    paddingHorizontal: 12,
    marginBottom: 15,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: "#12372A",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  link: {
    color: "#3B7D3A",
    fontWeight: "500",
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
});

export default styles;
