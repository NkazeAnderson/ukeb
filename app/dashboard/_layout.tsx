import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import DashboardNav from "@/components/navBar/DashboardNav";
import DashboardHeader from "@/components/DashboardPage/DashboardHeader";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <View className="flex flex-1 bg-background relative ">
      <SafeAreaView className="h-full">
        <View className=" flex flex-row h-full">
          <DashboardNav />

          <View className="flex flex-1 px-2 md:px-3 lg:px-6 bg-background">
            <DashboardHeader />

            <Stack screenOptions={{ headerShown: false }} />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default _layout;
