import React from "react";
import { Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";

export default function Btn(props) {
  const screenWidth = Dimensions.get("window").width;
  const buttonWidth = (screenWidth * parseInt(props.width)) / 100;

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: props.bgColor, width: buttonWidth? buttonWidth:200, height: props.height }]}
      onPress={props.onPress}
    >
      <Text style={[styles.text, { color: props.textColor }]}>{props.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    margin: 3,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});