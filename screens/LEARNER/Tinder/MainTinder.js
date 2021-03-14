import React, { Component } from "react";
import { View, Image, Dimensions, Text, StyleSheet } from "react-native";
import { Card, ListItem, Button } from "react-native-elements";
import TinderDeck from "./TinderDeck";
import { data } from "../../../data";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
const { width, height } = Dimensions.get("window");

export default class App extends Component {
  renderCard = (item) => {
    return (
      <Card key={item.id}>
        <View style={{ width: "100%" }}>
          <Image
            resizeMode='cover'
            source={item.image}
            style={{
              width: width - 90,
              height: height - 450,
              borderRadius: 14,
              marginRight: 30,
            }}
          />
          <Card.Title style={{ fontSize: 18 }}>{item.title}</Card.Title>
          <Card.Divider />
          <Text style={{ marginBottom: 10 }}>
            The idea with React Native Elements is more about component
            structure than actual design.
          </Text>
        </View>

        <Button
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
          }}
          title='VIEW NOW'
        />
      </Card>
    );
  };

  renderCardNoMoreCard = () => {
    return (
      <Card>
        <Card.Title>HELLO WORLD</Card.Title>
        <Button
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
          }}
          title='VIEW NOW'
        />
      </Card>
    );
  };
  render() {
    return (
      <SafeAreaProvider>
        <TinderDeck
          data={data}
          renderCard={this.renderCard}
          renderCardNoMoreCard={this.renderCardNoMoreCard}
        />
      </SafeAreaProvider>
    );
  }
}
