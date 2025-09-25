import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  headerContainer: {
    width: "100%",
    height: 200,
    overflow: "hidden",
    marginBottom: 20,
    position: "relative",
  },
  headerImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
  },
  waveSvg: {
    position: "absolute",
    bottom: 0,
    left: 0,
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

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DAF1DE",
    borderRadius: 15,
    paddingHorizontal: 12,
    margin: 15,
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
    margin: 15,
  },

  button: {
    backgroundColor: "#12372A",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    margin: 15,
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
