import { View, Text, Image } from "react-native";
import React from "react";
import Button from "../ui/Button";
import { useRouter } from "expo-router";

const HeroSection = () => {
  const router = useRouter();
  return (
    <View className="px-2 md:px-4 lg:px-6">
      <View className="p-3 md:p-6 lg:p-12 bg-primary">
        <View className="flex flex-col md:flex-row flex-1">
          <View className="bg-[#001276] w-full md:w-1/2 py-10 px-4">
            <Text className="font-bold text-32 lg:text-48 text-white">
              Grow your business.
            </Text>
            <Text className="font-bold text-32 lg:text-48 text-white">
              Bank on UKEB
            </Text>
            <Text className="font-regular text-16 lg:text-20 text-gray-text">
              Boost your business with help from our team
            </Text>
            <View className="lg:flex lg:flex-row lg:flex-1 items-center">
              <View className="lg:w-1/2 p-2">
                <Button
                  color="white"
                  textColor="primary"
                  action={() => {
                    router.push("/sign-up");
                  }}
                >
                  Open A Business Account
                </Button>
              </View>
              <View className="lg:w-1/2 p-2">
                <Button
                  outlined
                  color="white"
                  textColor="white"
                  action={() => {
                    router.push("/about-us");
                  }}
                >
                  Find out more
                </Button>
              </View>
            </View>
          </View>
          <View className="w-full md:w-1/2  lg:flex-grow lg:self-stretch relative overflow-hidden">
            <View className="w-full h-[250px] md:h-full">
              <Image
                className="flex-1"
                resizeMode="cover"
                source={require("@/assets/images/business-people.png")}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HeroSection;
