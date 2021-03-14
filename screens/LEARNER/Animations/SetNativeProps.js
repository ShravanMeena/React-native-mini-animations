import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";

export default class Opacity extends Component {
  constructor() {
    super();
    this.state = {
      animation: new Animated.Value(0),
    };
  }

  _enable = true;
  startAnimation = () => {
    this._enable = !this._enable;
    this._scroll.setNativeProps({
      scrollEnabled: this._enable,
    });
  };

  render() {
    const bgColor = this.state.animation.interpolate({
      inputRange: [0, 500],
      outputRange: ["red", "green"],
    });
    const animatedStyle = {
      backgroundColor: bgColor,
    };
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          ref={(scroll) => (this._scroll = scroll)}
          scrollEventThrottle={16}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: this.state.animation } } },
          ])}>
          <Text onPress={this.startAnimation()} style={styles.title}>
            Event Handler
          </Text>
          <Animated.View style={[styles.content, animatedStyle]} />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 35,
    letterSpacing: 0.5,
    textAlign: "center",
    marginVertical: 20,
  },
  content: {
    height: 3000,
    elevation: 6,
  },
});
