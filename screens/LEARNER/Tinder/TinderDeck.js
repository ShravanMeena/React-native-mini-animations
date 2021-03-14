import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
  LayoutAnimation,
  UIManager,
} from "react-native";
const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_WIDTH = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 550;
export default class Deck extends Component {
  static defaultProps = {
    onSwipeLeft: () => {},
    onSwipeRight: () => {},
  };

  constructor() {
    super();
    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_WIDTH) {
          this.forceSwipe("right");
        } else if (gesture.dx < -SWIPE_WIDTH) {
          this.forceSwipe("left");
        } else {
          this.resetPosition();
        }
      },
    });
    this.state = {
      panResponder,
      position,
      index: 0,
    };
  }

  componentDidUpdate() {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }
  forceSwipe = (direction) => {
    const x = direction === "right" ? SCREEN_WIDTH * 1.1 : -SCREEN_WIDTH * 1.1;
    Animated.timing(this.state.position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION,
    }).start(() => {
      this.onSwipeComplete(direction);
    });
  };

  onSwipeComplete = (direction) => {
    const { onSwipeRight, onSwipeLeft, data } = this.props;
    const item = data[this.state.index];
    direction === "right" ? onSwipeRight(item) : onSwipeLeft(item);
    this.state.position.setValue({ x: 0, y: 0 });
    this.setState({
      index: this.state.index + 1,
    });
  };

  resetPosition = () => {
    Animated.spring(this.state.position, {
      toValue: { x: 0, y: 0 },
    }).start();
  };

  getCardStyle = () => {
    const { position } = this.state;
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ["-120deg", "0deg", "120deg"],
    });
    return {
      ...this.state.position.getLayout(),
      transform: [{ rotate }],
    };
  };

  renderCards = () => {
    if (this.state.index >= this.props.data.length) {
      return this.props.renderCardNoMoreCard();
    }
    return this.props.data
      .map((item, i) => {
        if (i < this.state.index) {
          return null;
        }
        if (i === this.state.index) {
          return (
            <Animated.View
              style={[this.getCardStyle(), styles.card]}
              {...this.state.panResponder.panHandlers}
              key={item.id}>
              {this.props.renderCard(item)}
            </Animated.View>
          );
        }
        return (
          <Animated.View
            key={item.id}
            style={[
              styles.card,
              {
                top: 2 * (i - this.state.index),
                left: 2 * (i - this.state.index),
              },
            ]}>
            {this.props.renderCard(item)}
          </Animated.View>
        );
      })
      .reverse();
  };
  render() {
    return <View>{this.renderCards()}</View>;
  }
}

const styles = StyleSheet.create({
  card: {
    position: "absolute",
    zIndex: 1,
    width: SCREEN_WIDTH,
  },
});
