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
      animationScale: new Animated.Value(0),
      animationColor: new Animated.Value(0),
    };
  }

  startAnimation = () => {
    Animated.stagger(200, [
      Animated.timing(this.state.animationScale, {
        toValue: 1,
        duration: 500,
      }),

      Animated.timing(this.state.animationColor, {
        toValue: 1,
        duration: 500,
      }),
    ]).start(() => alert("Stagger Animation Ended!!!"));
  };
  render() {
    const boxInterPolation = this.state.animationScale.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 2],
    });
    const colorInterpolation = this.state.animationColor.interpolate({
      inputRange: [0, 1],
      outputRange: ["red", "green"],
    });
    const animatedStyle = {
      transform: [{ scale: boxInterPolation }],
    };

    const animatedTextStyle = {
      color: colorInterpolation,
    };
    return (
      <SafeAreaView style={styles.container}>
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
    width: 150,
    height: 150,
    borderRadius: 10,
    elevation: 6,
    backgroundColor: "blue",
  },
});
