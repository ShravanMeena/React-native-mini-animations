import React, { useRef } from "react";
import { Text, View, Animated, ScrollView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import SafeAreaView from "react-native-safe-area-view";
import AnimatedHeader from "./AnimatedHeader";

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 7, 6, 5, 4, 3, 3, 4, 5];
export default function App() {
  const offset = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} forceInset={{ top: "always" }}>
        <AnimatedHeader animatedValue={offset} />
        <ScrollView
          style={{ flex: 1, backgroundColor: "white" }}
          contentContainerStyle={{
            alignItems: "center",
            paddingTop: 220,
            paddingHorizontal: 20,
          }}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: offset } } }],
            { useNativeDriver: false }
          )}>
          {data.map((item) => (
            <View
              key={item.id}
              style={{
                marginBottom: 20,
              }}>
              <Text style={{ color: "#101010", fontSize: 32 }}>asdasd</Text>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
