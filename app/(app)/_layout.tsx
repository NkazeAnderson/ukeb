import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "@/components/navBar/NavBar";

const _layout = () => {
  return (
    <SafeAreaView className="flex flex-1 bg-background ">
      <NavBar />
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaView>
  );
};

export default _layout;
