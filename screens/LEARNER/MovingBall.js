import React, { Component } from "react";
import { View, StyleSheet, Animated } from "react-native";
export default class MovingBall extends Component {
  render() {
    this.position = new Animated.ValueXY(0, 0);
    Animated.spring(this.position, {
      toValue: { x: 200, y: 200 },
    }).start();
    return (
      <Animated.View style={this.position.getLayout()}>
        <View style={styles.ball} />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  ball: {
    width: 60,
    height: 60,
    borderWidth: 60,
    borderRadius: 40,
  },
});
