import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
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
      toValue: 200,
      duration: 1000,
    }).start(() => {
      // this.state.animation.setValue(0)
      Animated.timing(this.state.animation, {
        toValue: 0,
        duration: 1000,
      }).start();
    });
  };

  render() {
    const animatedStyle = {
      transform: [
        {
          translateY: this.state.animation, //translateX,transalateY,translateXY
        },
      ],
    };
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Translate Postion</Text>
        <TouchableOpacity onPress={() => this.startAnimation()}>
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
    width: 100,
    height: 100,
    borderRadius: 500,
    elevation: 6,
    backgroundColor: "red",
  },
});
