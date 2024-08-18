import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthNavBar from "@/components/navBar/AuthNavBar";

const _layout = () => {
  return (
    <SafeAreaView className="flex flex-1 flex-col bg-background ">
      <AuthNavBar />
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaView>
  );
};

export default _layout;
