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
    };
  }

  startAnimation = () => {
    Animated.timing(this.state.animation, {
      toValue: 1,
      duration: 500,
    }).start();
  };
  render() {
    const rotateInterpolate = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"],
    });

    const animatedStyle = {
      transform: [
        {
          rotate: rotateInterpolate, //rotateX.rotateY
        },
      ],
    };
    return (
      <SafeAreaView style={styles.container}>
        <Text style={[styles.title]}>Rotate</Text>
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
    width: 200,
    height: 200,
    // borderRadius: 500,
    elevation: 6,
    backgroundColor: "red",
  },
});
