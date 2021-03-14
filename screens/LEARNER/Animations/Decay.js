import React, { Component } from "react";
import { Animated, View, StyleSheet, PanResponder, Text } from "react-native";

class App extends Component {
  pan = new Animated.ValueXY();
  panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      this.pan.setOffset({
        x: this.pan.x._value,
        y: this.pan.y._value,
      });
    },
    onPanResponderMove: Animated.event([
      null,
      { dx: this.pan.x, dy: this.pan.y },
    ]),
    onPanResponderRelease: (e, { vx, vy }) => {
      //   this.pan.flattenOffset();
      Animated.decay(this.pan, {
        velocity: { x: vx, y: vy },
        deceleration: 0.997,
      }).start();
    },
  });

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>Pan Responder</Text>
        <Animated.View
          style={{
            transform: [{ translateX: this.pan.x }, { translateY: this.pan.y }],
          }}
          {...this.panResponder.panHandlers}>
          <View style={styles.box} />
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 24,
    lineHeight: 24,
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: "blue",
    borderRadius: 5,
  },
});

export default App;
