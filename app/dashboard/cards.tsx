import { View, Text, Pressable } from "react-native";
import React from "react";
import CreditCard from "@/components/ui/CreditCard";
import DashboardHeadings from "@/components/DashboardPage/DashboardHeadings";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { colors } from "@/constants/constants";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
const cards = () => {
  return (
    <View className="flex flex-1 bg-background">
      <DashboardHeadings centered>Banking Card</DashboardHeadings>

      <View className="flex flex-row items-center justify-center py-5">
        <CreditCard />
      </View>
      <View className="flex flex-row items-center justify-center">
        <View className="w-[340px]">
          <Pressable className="flex flex-row items-center p-2 space-x-4  bg-primary rounded-lg">
            <FontAwesome5 name="plus" size={24} color={colors.white} />
            <Text className="font-medium text-18 text-white ">Top Up</Text>
          </Pressable>

          <View className="flex flex-row my-2">
            <View className="w-2/3 pr-1">
              <Pressable className="flex flex-row items-center p-2 space-x-4  bg-secondary rounded-lg">
                <MaterialIcons
                  name="assignment-return"
                  size={24}
                  color={colors.white}
                />
                <Text className="font-medium text-18 text-white ">
                  Withdraw
                </Text>
              </Pressable>
            </View>
            <View className="w-1/3">
              <Pressable className="flex flex-row items-center p-2 space-x-4  bg-danger rounded-lg">
                <FontAwesome name="unlock-alt" size={24} color={colors.white} />
                <Text className="font-medium text-18 text-white ">Lock</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
      <DashboardHeadings>Card Transactions</DashboardHeadings>
      <Text className="font-regular text-white text-16">
        No Transanction recorded
      </Text>
    </View>
  );
};

export default cards;
