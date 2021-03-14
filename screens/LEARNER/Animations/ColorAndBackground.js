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
    const boxInterPolation = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["red", "green"],
    });
    const colorInterpolation = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["green", "red"],
    });
    const animatedStyle = {
      backgroundColor: boxInterPolation,
    };

    const animatedTextStyle = {
      color: colorInterpolation,
    };
    return (
      <SafeAreaView style={styles.container}>
        <Animated.Text
          style={[
            styles.title,
            animatedTextStyle,
            { fontSize: 20, padding: 20, fontWeight: "bold" },
          ]}>
          ColorAndBackgroundss..
        </Animated.Text>
        <TouchableOpacity onPress={() => this.startAnimation()}>
          <Animated.View style={[styles.ball, animatedStyle]}>
            <Animated.Text
              style={[
                animatedTextStyle,
                { fontSize: 20, padding: 20, fontWeight: "bold" },
              ]}>
              Animated Text !!!
            </Animated.Text>
          </Animated.View>
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
    // backgroundColor: "red",
  },
});
