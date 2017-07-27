import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap"
  },
  row: {
    flexDirection: "column",
    alignSelf: "flex-start",
    justifyContent: "center",
    alignItems: "center"
  },
  checkbox: {
    width: 24,
    height: 24,
    position: "absolute",
    bottom: 0,
    right: 0,
    zIndex: 1
  }
});
