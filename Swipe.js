import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withTiming,
} from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";

const window = Dimensions.get("window");

const pages = [
  { color: "red", key: "1" },
  { color: "yellow", key: "2" },
  { color: "blue", key: "3" },
];

const maxwidth = (pages.length - 1) * -window.width;

const snapPoints = pages.map((_, i) => i * -window.width);

const snapToPoint = (distance, points, velocity) => {
  "worklet";
  const differences = points.map((p) => ({
    diff: Math.abs(p - distance - velocity * 0.05),
    point: p,
  }));
  return differences.sort((a, b) => a.diff - b.diff)[0].point;
};

const handleOverflow = (move) => {
  "worklet";
  if (move > 0) {
    return 0;
  } else if (move < maxwidth) {
    return maxwidth;
  } else {
    return move;
  }
};

export default function Swipe(props) {
  const swipeOffset = useSharedValue(props.page);
  const startX = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onStart((e) => {
      startX.value = swipeOffset.value;
    })
    .onUpdate((e) => {
      swipeOffset.value = handleOverflow(e.translationX + startX.value);
    })
    .onEnd((e) => {
      swipeOffset.value = withTiming(
        snapToPoint(swipeOffset.value, snapPoints, e.velocityX),
        300 / e.velocityX / 0.05
      );
      () => {
        "worklet";
        props.handleSwipe(snapPoints.indexOf(swipeOffset.value));
      };
    });

  const uas = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: swipeOffset.value }],
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.container, uas]}>
        {pages.map((page) => (
          <View
            style={[{ backgroundColor: page.color }, styles.back]}
            key={page.key}
          ></View>
        ))}
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    width: maxwidth,
    height: window.height * 0.9,
    flexDirection: "row",
  },
  back: {
    width: window.width,
    height: window.height * 0.9,
  },
});
