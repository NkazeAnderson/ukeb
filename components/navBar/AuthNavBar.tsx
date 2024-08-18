import { View, Text, Pressable } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { colors } from "@/constants/constants";
import { useRouter } from "expo-router";

const AuthNavBar = () => {
  const router = useRouter();
  return (
    <View className="flex flex-row justify-between px-2 md:px-3 lg:px-6">
      <Pressable
        className="flex flex-row space-x-3 items-center hover:cursor-pointer"
        onPress={() => {
          router.canGoBack() ? router.back() : router.push("/");
        }}
      >
        <Ionicons
          name="arrow-back-circle-sharp"
          size={24}
          color={colors.white}
        />

        <Text className="font-regular text-white text-24">Back</Text>
      </Pressable>
      <View className="flex flex-row space-x-3 items-center">
        <FontAwesome5 name="lock" size={24} color={colors.success} />
        <Text className="font-regular text-success md:text-24 text-18">
          Secure Page
        </Text>
      </View>
    </View>
  );
};

export default AuthNavBar;
