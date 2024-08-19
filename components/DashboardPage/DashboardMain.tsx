import { View, Text } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import AntDesign from "@expo/vector-icons/AntDesign";
import { colors } from "@/constants/constants";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import Button from "../ui/Button";

const DashboardMain = () => {
  return (
    <ScrollView className=" flex flex-1 bg-blue/20 p-2 md:px-3 lg:px-6 rounded-md ">
      <View className="flex flex-row pb-12">
        <View className="w-full lg:w-2/3 space-y-2">
          <Text className="text-secondary font-medium text-24 md:text-32">
            Important Updates
          </Text>

          <View className="flex space-x-3 flex-row items-center border-2 border-info">
            <View className="bg-info p-2 ">
              <AntDesign name="infocirlceo" size={24} color={colors.white} />
            </View>
            <Text className="font-regular text-16 text-white">
              New account created
            </Text>
          </View>
          <Text className="text-secondary text-center font-medium text-24 md:text-32">
            Accounts
          </Text>

          <View className="border-secondary  border-2">
            <View className="bg-secondary">
              <Text className="font-medium text-center text-16 text-white">
                Account Number
              </Text>
            </View>
            <View className="p-1">
              <Text className="font-regular text-center text-16 text-white">
                1234567890
              </Text>
            </View>
            <View className="bg-secondary flex flex-row items-center justify-between px-5">
              <Text className="font-medium text-center text-16 text-white">
                Share
              </Text>
              <Entypo name="share" size={16} color={colors.white} />
            </View>
          </View>
          <View>
            <Text className="text-gray-text text-center font-medium text-24 md:text-32">
              Balance
            </Text>
            <Text className="text-white text-center font-bold text-32 md:text-48 ">
              $ 0
            </Text>
            <Text className="text-gray-text text-center font-bold text-14 md:text-16 ">
              Available
            </Text>
          </View>
          <View className="flex flex-row justify-between">
            <View className="flex w-1/2 flex-row  items-center">
              <View className="bg-success p-2 rounded-full ">
                <Feather name="arrow-up-right" size={24} color={colors.white} />
              </View>
              <View className="p-2">
                <Text className="font-regular text-16 text-white">
                  Incoming
                </Text>
                <Text className="font-regular text-14 text-white">
                  $ 1000000000
                </Text>
              </View>
            </View>
            <View className="flex w-1/2  flex-row items-center justify-end ">
              <View className="p-2">
                <Text className="font-regular text-16 text-white">
                  Outgoing
                </Text>
                <Text className="font-regular text-14 text-white">
                  $ 1000000000
                </Text>
              </View>
              <View className="bg-danger p-2 rounded-full ">
                <Feather
                  name="arrow-down-right"
                  size={24}
                  color={colors.white}
                />
              </View>
            </View>
          </View>
          <View className="px-[25%] md:px-0.5 lg:px-[25%]">
            <Button color="primary" textColor="white">
              Send Money
            </Button>
          </View>
          <Text className="text-secondary font-medium text-24 md:text-32">
            Transactions
          </Text>
          <View className="flex space-x-3 bg-info/20 rounded flex-row items-start border-2 border-info">
            <View className="bg-info p-2 h-full ">
              <AntDesign name="infocirlceo" size={24} color={colors.white} />
            </View>
            <View className="flex-grow">
              <Text className="font-medium text-18 text-white">
                No Transaction
              </Text>
              <Text className="font-regular text-16 text-white">
                No Transaction recorded for this account
              </Text>
              <View className="flex flex-row justify-end items-center ">
                <Text className="text-end text-gray-text">12/07/2024</Text>
              </View>
            </View>
          </View>
          <View className="flex space-x-3 bg-info/20 rounded flex-row items-start border-2 border-info">
            <View className="bg-info p-2 h-full ">
              <AntDesign name="infocirlceo" size={24} color={colors.white} />
            </View>
            <View className="flex-grow px-1">
              <Text className="font-medium text-18 text-white">
                Incoming Funds
              </Text>
              <Text className="font-regular text-ellipsis text-16 text-white">
                Pending transaction
              </Text>
              <Text className="font-regular text-ellipsis text-16 text-white">
                $10000000
              </Text>

              <Text className="font-regular text-16 text-white">
                Reason of Payment: Purchase of Artifacts
              </Text>
              <View className="flex flex-row justify-end items-center ">
                <Text className="text-end text-gray-text">12/07/2024</Text>
              </View>
            </View>
          </View>
        </View>
        <View className="lg:w-1/3"></View>
      </View>
    </ScrollView>
  );
};

export default DashboardMain;
