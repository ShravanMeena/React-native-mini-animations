import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";

// Package
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

// Screens
import MainScreen from "./screens/MainScreen";
import DetailScreen from "./screens/DetailScreen";

import Food from "./screens/Food/Food";
import FoodDetails from "./screens/Food/FoodDetails";
import TryAnimation from "./screens/Food/TryAnimation"; //this is for food details animated

import MainTinder from "./screens/LEARNER/Tinder/MainTinder";
import Opacity from "./screens/LEARNER/Animations/Stagger";

const Stack = createSharedElementStackNavigator();

const App = ({ navigation }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Food'
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          cardOverlayEnabled: true,
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}>
        <Stack.Screen name='Food' component={Food} />
        <Stack.Screen name='FoodDetails' component={FoodDetails} />
        <Stack.Screen name='TryAnimation' component={TryAnimation} />

        <Stack.Screen name='MainScreen' component={MainScreen} />

        <Stack.Screen name='MainTinder' component={MainTinder} />
        <Stack.Screen name='Opacity' component={Opacity} />

        <Stack.Screen
          name='DetailScreen'
          component={DetailScreen}
          options={(navigation) => ({
            headerBackTitleVisible: false,
            cardStyleInterpolator: ({ current: { progress } }) => {
              return {
                cardStyle: {
                  opacity: progress,
                },
              };
            },
          })}
          sharedElementsConfig={(route) => {
            const { data } = route.params;
            return [
              {
                id: `item.${data.id}.photo`,
                animation: "move",
                resize: "clip",
                align: "center-top",
              },
              {
                id: `item.${data.id}.text`,
                animation: "fade",
                resize: "clip",
                align: "left-center",
              },

              {
                id: `item.${data.id}.profilePic`,
                animation: "move",
                resize: "clip",
                align: "left-center",
              },
              {
                id: `item.${data.id}.username`,
                animation: "fade",
                resize: "clip",
                align: "left-center",
              },
              {
                id: `item.${data.id}.readtime`,
                animation: "fade",
                resize: "clip",
                align: "left-center",
              },
            ];
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
