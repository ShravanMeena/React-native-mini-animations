import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Animated,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { color } from "react-native-reanimated";

export default class Opacity extends Component {
  constructor() {
    super();
    this.state = {
      animation: new Animated.Value(0),
      animationColor: new Animated.Value(0),
    };
  }

  startAnimation = () => {
    Animated.timing(this.state.animation, {
      toValue: 1,
      duration: 1500,
    }).start();

    Animated.timing(this.state.animation, {
      toValue: 2,
      duration: 2500,
    }).start();
  };
  render() {
    const animated = this.state.animation.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, 300, 0],
    });
    const opacityInterpolate = animated.interpolate({
      inputRange: [0, 300],
      outputRange: [1, 0],
    });

    const crazyInterpolate = animated.interpolate({
      inputRange: [0, 30, 50, 80, 100, 160, 299, 300],
      outputRange: [1, -30, -50, 80, -100, 300, 0, -100],
    });

    const animatedStyle = {
      transform: [{ translateY: animated }, { translateX: crazyInterpolate }],
      opacity: opacityInterpolate,
    };

    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={() => this.startAnimation()}>
          <Animated.View style={[styles.ball, animatedStyle]}></Animated.View>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 35,
    letterSpacing: 0.5,
    textAlign: "center",
    marginVertical: 20,
  },
  ball: {
    width: 150,
    height: 150,
    borderRadius: 10,
    elevation: 6,
    backgroundColor: "blue",
  },
});
