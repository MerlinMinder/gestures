import React from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

export default function Ball() {
  const pressed = useSharedValue(false);
  const offset = useSharedValue({ x: 0, y: 0 });
  const color = useSharedValue("pink");

  const uas = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: offset.value.x },
        { translateY: offset.value.y },
        { scale: withSpring(pressed.value ? 1.2 : 1) },
      ],
      backgroundColor: color.value,
    };
  });

  const start = useSharedValue({ x: 0, y: 0 });

  const gesture = Gesture.Pan()
    .onBegin(() => {
      pressed.value = true;
      color.value = "green";
    })
    .onUpdate((e) => {
      offset.value = {
        x: e.translationX + start.value.x,
        y: e.translationY + start.value.y,
      };
    })
    .onEnd((e) => {
      start.value = {
        x: offset.value.x,
        y: offset.value.y,
      };
    })
    .onFinalize(() => {
      pressed.value = false;
      color.value = "pink";
    });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.ball, uas]}></Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  ball: {
    width: 100,
    height: 100,
    borderRadius: 50,
    position: "absolute",
  },
});
