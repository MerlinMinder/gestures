import React, { useState } from "react";
import "react-native-gesture-handler";
import { StyleSheet, View } from "react-native";
import {
  gestureHandlerRootHOC,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Ball from "./Ball";
import Swipe from "./Swipe";
import Menu from "./Menu";

export default function App() {
  const [page, setPage] = useState(-450);
  const handleSwipe = (newpage) => {
    "worklet";
    setPage(newpage);
  };

  const App = gestureHandlerRootHOC(() => (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <Swipe page={page} handleSwipe={handleSwipe} />
        <Menu page={page} handleSwipe={handleSwipe} />
        <Ball />
      </View>
    </GestureHandlerRootView>
  ));

  return <App />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: "blue",
  },
});
