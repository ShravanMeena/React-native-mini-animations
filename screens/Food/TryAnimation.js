import React, { Component } from "react";
import {
  Animated,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  View,
  FlatList,
  RefreshControl,
} from "react-native";
import { popular, data } from "../../data";
import TouchableScale from "react-native-touchable-scale";
const { width, height } = Dimensions.get("window");
import { Rating, AirbnbRating } from "react-native-ratings";

const HEADER_MAX_HEIGHT = 280;
const HEADER_MIN_HEIGHT = Platform.OS === "ios" ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(
        // iOS has negative initial scroll value because content inset...
        Platform.OS === "ios" ? -HEADER_MAX_HEIGHT : 0
      ),
      refreshing: false,
    };
  }

  render() {
    // Because of content inset the scroll value will be negative on iOS so bring
    // it back to 0.
    const scrollY = Animated.add(
      this.state.scrollY,
      Platform.OS === "ios" ? HEADER_MAX_HEIGHT : 0
    );
    const headerTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE],
      extrapolate: "clamp",
    });

    const imageOpacity = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: "clamp",
    });
    const imageTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 100],
      extrapolate: "clamp",
    });

    return (
      <View style={styles.fill}>
        <StatusBar
          translucent
          barStyle='light-content'
          backgroundColor='rgba(0, 0, 0, 0.251)'
        />
        <Animated.ScrollView
          style={styles.fill}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: true }
          )}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => {
                this.setState({ refreshing: true });
                setTimeout(() => this.setState({ refreshing: false }), 1000);
              }}
              // Android offset for RefreshControl
              progressViewOffset={HEADER_MAX_HEIGHT}
            />
          }
          // iOS offset for RefreshControl
          contentInset={{
            top: HEADER_MAX_HEIGHT,
          }}
          contentOffset={{
            y: -HEADER_MAX_HEIGHT,
          }}>
          <View
            style={[
              {
                backgroundColor: "#fff",
                borderTopLeftRadius: 40,
                borderTopRightRadius: 40,
                marginTop: HEADER_MAX_HEIGHT + 5,
                position: "relative",
                width: "100%",
                padding: 20,
              },
            ]}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={{ fontSize: 20, letterSpacing: 0.5 }}>
                <Text style={{ fontSize: 30 }}>S</Text>picy chiken pizza
              </Text>
              <Text style={{ fontSize: 28 }}>₹ 99</Text>
            </View>

            <View>
              <View
                style={{
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  marginBottom: 10,
                }}>
                <Rating type='star' ratingCount={5} imageSize={20} />
              </View>

              <Text style={{ fontSize: 14, color: "#bbb" }}>
                Lorem ipsum, or lipsum as it is sometimes known, is dummy text
                used in laying out print, graphic or web designs. The passage is
                attributed to an unknown typesetter in the 15th century who is
                thought to have scrambled parts of Cicero's De Finibus Bonorum
                et Malorum for use in a type specimen book. Lorem ipsum, or
                lipsum as it is sometimes known, is dummy text used in laying
                out print, graphic or web designs. The passage is attributed to
                an unknown typesetter in the 15th century who is thought to have
                scrambled parts of Cicero's De Finibus Bonorum et Malorum for
                use in a type specimen book.
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                width: "100%",
                padding: 15,
                backgroundColor: "#e8e6e6",
                borderRadius: 10,
                marginVertical: 20,
                justifyContent: "space-between",
                alignItems: "center",
              }}>
              <Text style={{ fontSize: 18 }}>Topings</Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("MainTinder")}
                style={{
                  paddingVertical: 2,
                  paddingHorizontal: 15,
                  borderColor: "#d4d5d6",
                  borderWidth: 1,
                  borderRadius: 10,
                }}>
                <Text style={{ fontSize: 18 }}>+ Add</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              backgroundColor: "#fff",
              padding: 20,
            }}>
            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  letterSpacing: 0.5,
                  paddingVertical: 10,
                }}>
                Related Items
              </Text>
            </View>

            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={data}
              keyExtractor={(item) => item.id}
              //   style={{ paddingHorizontal: 30 }}
              renderItem={({ item, index }) => {
                return (
                  <TouchableScale
                    activeScale={0.9}
                    tension={50}
                    friction={7}
                    useNativeDriver>
                    <View
                      style={{
                        width: width / 2,
                        height: width / 2,
                        padding: 10,
                        backgroundColor: "#ededed",
                        borderWidth: 1,
                        marginRight: 20,
                        borderRadius: 10,
                        borderColor: "#ededed",
                      }}>
                      <Image
                        source={item.image}
                        style={{
                          width: "100%",
                          height: width / 4.5,
                          borderRadius: 10,
                          marginRight: 30,
                        }}
                        resizeMode='contain'
                      />
                      <Text
                        style={{
                          paddingVertical: 5,
                          fontSize: 14,
                          letterSpacing: 0.2,
                        }}>
                        {item.title.slice(0, 40)}
                      </Text>

                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          paddingTop: 5,
                        }}>
                        <Text style={{ fontSize: 16 }}>₹ 99</Text>
                        <TouchableScale
                          activeScale={0.6}
                          tension={50}
                          friction={7}
                          useNativeDriver
                          style={{
                            paddingVertical: 2,
                            paddingHorizontal: 15,
                            borderColor: "#d4d5d6",
                            borderWidth: 1,
                            borderRadius: 10,
                          }}>
                          <Text>Add</Text>
                        </TouchableScale>
                      </View>
                    </View>
                  </TouchableScale>
                );
              }}
            />
          </View>
        </Animated.ScrollView>

        <Animated.View
          pointerEvents='none'
          style={[
            styles.header,
            { transform: [{ translateY: headerTranslate }] },
          ]}>
          <Animated.Image
            style={[
              styles.backgroundImage,
              {
                opacity: imageOpacity,
                transform: [{ translateY: imageTranslate }],
              },
            ]}
            source={require("../../assets/pizza_PNG44094.png")}
          />
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fill: {
    backgroundColor: "#e8e6e6",
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    overflow: "hidden",
    height: HEADER_MAX_HEIGHT,
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: "contain",
  },

  scrollViewContent: {
    // iOS uses content inset, which acts like padding.
    paddingTop: Platform.OS !== "ios" ? HEADER_MAX_HEIGHT : 0,
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: "green",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
