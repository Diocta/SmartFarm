import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DAF1DE",
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
    fontSize: 50,
    fontWeight: "bold",
    color: "#0B2B26",
    marginBottom: 5,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#051F20",
    opacity: 0.5,
    marginBottom: 50,
    textAlign: "center",
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#8EB69B",
    borderRadius: 15,
    paddingHorizontal: 12,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 15,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    padding: 12,
    marginLeft: 8,
    color: "#0B2B26",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    marginHorizontal: 25,
  },
  link: {
    color: "#235247",
    fontWeight: "500",
    marginBottom: 25,
    marginHorizontal: 15,
  },

  button: {
    backgroundColor: "#0B2B26",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    margin: 30,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  footer: {
    textAlign: "center",
    fontSize: 14,
    color: "#235247",
  },
});

export default styles;
