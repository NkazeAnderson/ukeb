import { View, Text, Image } from "react-native";
import React from "react";
import { isWeb } from "@/constants/environment";
import Button from "../ui/Button";

const Apps = () => {
  if (!isWeb) {
    return null;
  }
  return (
    <View className="py-4 px-2 md:px-4 lg:px-6 bg-gray flex flex-col space-y-3 lg:space-y-0 lg:flex-row items-center justify-between">
      <View className="w-full lg:w-1/4">
        <View className="w-[100px] h-[100px]">
          <Image
            className="flex-1 aspect-video"
            resizeMode="contain"
            source={require("@/assets/images/app-stores.png")}
          />
        </View>
      </View>
      <View className="flex-grow lg:w-1/3 space-y-2 lg:space-y-2">
        <Text className="font-medium text-18 text-white">
          Free accounting software with Freshbooks for all our business current
          account holders
        </Text>
        <Text className="font-regular text-16 text-gray-text">
          Our business current account customers get business accounting and
          invoicing software worth more than £260 a year, for free, as standard.
          T&Cs apply.
        </Text>
      </View>
      <View className="w-full lg:w-1/3 px-5 ">
        <Button color="white" textColor="white" outlined>
          Download app
        </Button>
      </View>
    </View>
  );
};

export default Apps;
