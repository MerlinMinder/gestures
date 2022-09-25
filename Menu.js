import React from "react";
import { Dimensions, StyleSheet, View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
const window = Dimensions.get("window");

export default function Menu(props) {
  return (
    <View style={styles.menu}>
      <Button text={"1"} handleClick={props.handleSwipe} move={0} />
      <Button text={"2"} handleClick={props.handleSwipe} move={-window.width} />
      <Button
        text={"3"}
        handleClick={props.handleSwipe}
        move={-window.width * 2}
      />
    </View>
  );
}

function Button(props) {
  return (
    <TouchableOpacity
      onPress={() => {
        "worklet";
        props.handleClick(props.move);
      }}
    >
      <View style={styles.button}>
        <Text style={styles.text}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  menu: {
    backgroundColor: "green",
    height: window.height * 0.1,
    width: window.width,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  button: {
    height: window.height * 0.08,
    width: window.width * 0.3,
    backgroundColor: "purple",
  },
  text: {
    height: window.height * 0.08,
    width: window.width * 0.3,
    textAlign: "center",
    fontSize: 20,
  },
});
