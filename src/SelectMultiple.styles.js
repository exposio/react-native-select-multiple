import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap"
  },
  row: {
    width: 200,
    height: 200,
    flexShrink: 0,
    flexDirection: "column",
    alignSelf: "flex-start",
    justifyContent: "center",
    alignItems: "center"
  },
  checkbox: {
    width: 20,
    height: 20,
    position: "absolute",
    bottom: 0,
    right: 0,
    zIndex: 1
  }
});
