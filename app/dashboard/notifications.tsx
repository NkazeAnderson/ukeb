import { View, Text } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import DashboardHeadings from "@/components/DashboardPage/DashboardHeadings";

const notifications = () => {
  return (
    <View className="flex flex-1 bg-background">
      <ScrollView>
        <DashboardHeadings centered>Notifications</DashboardHeadings>
        <View className=" border-2 border-primary/30 bg-primary/10 my-1">
          <View className=" w-full p-2 bg-primary/30">
            <Text className=" font-medium text-white">New Account Created</Text>
          </View>
          <View className=" p-1">
            <Text className="text-primary font-regular text-14">
              Welcome to Ukeb, your new account was successfully created
            </Text>
          </View>
        </View>
      </ScrollView>
      <Text>notifications</Text>
    </View>
  );
};

export default notifications;
