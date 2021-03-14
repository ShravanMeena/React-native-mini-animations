import React, { Component } from "react";
import {
  View,
  TextInput,
  Text,
  StatusBar,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
  Animated,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { popular, data } from "../../data";
import TouchableScale from "react-native-touchable-scale";
const { width, height } = Dimensions.get("window");
import { SafeAreaProvider } from "react-native-safe-area-context";

export default class Food extends Component {
  render() {
    return (
      <SafeAreaProvider style={{ flex: 1 }}>
        <ScrollView
          style={{
            padding: 10,
            backgroundColor: "#f7f9ff",
            flex: 1,
          }}>
          <StatusBar />

          <Text style={{ fontSize: 40, fontWeight: "bold" }}>Hungry?</Text>
          <Text style={{ fontSize: 30 }}>Order & Eat.</Text>

          {/* search */}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderWidth: 1,
              padding: 10,
              borderRadius: 10,
              borderColor: "#f7f9ff",
              backgroundColor: "#f7f9ff",
              elevation: 2,
              marginVertical: 20,
            }}>
            <TextInput placeholder='Search' style={{ flex: 0.9 }} />
            <Feather
              name='search'
              size={24}
              color='#b7babd'
              style={{ flex: 0.1 }}
            />
          </View>
          <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                letterSpacing: 0.5,
                paddingVertical: 10,
              }}>
              Popular Food
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
                  useNativeDriver
                  onPress={() =>
                    this.props.navigation.navigate("TryAnimation")
                  }>
                  <View
                    style={{
                      width: width / 2,
                      height: width / 2,
                      padding: 10,
                      backgroundColor: "#ededed",
                      borderWidth: 1,
                      marginRight: 10,
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

          {/* All */}
          <View style={{}}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                letterSpacing: 0.5,
                paddingVertical: 10,
              }}>
              All
            </Text>
          </View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={data}
            numColumns={2}
            keyExtractor={(item) => item.id}
            //   style={{ paddingHorizontal: 30 }}
            renderItem={({ item, index }) => {
              return (
                <TouchableScale
                  activeScale={0.9}
                  tension={50}
                  friction={7}
                  useNativeDriver
                  onPress={() => console.log("")}
                  style={{
                    width: "49%",
                    margin: "1%",
                    height: width / 2 + 20,
                    padding: 10,
                    backgroundColor: "#ededed",
                    borderWidth: 1,
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
                    {item.title.slice(0, 40)}..
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
                </TouchableScale>
              );
            }}
          />
        </ScrollView>
      </SafeAreaProvider>
    );
  }
}
