import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Animated,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

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
    }).start(() => {
      Animated.timing(this.state.animation, {
        toValue: 0,
        duration: 2000,
      }).start();
    });
  };
  render() {
    const bgInter = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["red", "blue"],
    });
    const widthInterpolation = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["20%", "50%"],
    });

    const heightInterpolation = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["20%", "60%"],
    });
    const animatedStyle = {
      width: widthInterpolation,
      height: heightInterpolation,
      backgroundColor: bgInter,
    };
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Width Height Percentage</Text>
        <TouchableOpacity
          style={{
            width: "100%",
            height: "100%",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f5f5f5",
          }}
          onPress={() => this.startAnimation()}>
          <Animated.View style={[styles.ball, animatedStyle]} />
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
    width: "20%",
    height: "20%",
    elevation: 6,
    backgroundColor: "red",
  },
});
