import { View, Text } from "react-native";
import React from "react";
import DashboardHeadings from "@/components/DashboardPage/DashboardHeadings";

const loans = () => {
  return (
    <View className="flex flex-1 bg-background items-center justify-center">
      <DashboardHeadings centered>Loans</DashboardHeadings>
      <Text className=" font-regular text-white text-16 text-center">
        This account is Illegal to for Loans. Contact an agent for assistance
      </Text>
    </View>
  );
};

export default loans;
