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
  checkboxWrapper: {
    position: "absolute",
    bottom: -10,
    right: -10,
    width: 40,
    height: 40,
    borderWidth: 10,
    borderColor: "transparent",
    zIndex: 1
  },
  checkbox: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    zIndex: 1
  },
  loading: {
    width: 24,
    height: 24
  },
  processingMessageWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  processingMessageWrapperProcessing: {
    backgroundColor: "rgba(14,12,12,0.6)"
  },
  processingMessage: {
    color: "#fff",
    fontSize: 12,
    paddingLeft: 8,
    paddingRight: 8
  }
});
