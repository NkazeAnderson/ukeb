import { View, Text, Pressable } from "react-native";
import React, { useContext } from "react";
import { Stack, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "@/components/navBar/NavBar";
import { FontAwesome5 } from "@expo/vector-icons";
import { colors } from "@/constants/constants";
import { AppContext } from "@/components/ContextProviders/AppContext";
const _layout = () => {
  const router = useRouter();
  const { bankInfo } = useContext(AppContext) as appContextT;
  return (
    <SafeAreaView className="flex flex-1 bg-background ">
      <NavBar />
      <Stack screenOptions={{ headerShown: false }} />
      <Pressable
        onPress={() => {
          router.push(`https://wa.me/+${bankInfo.whatsapp1}`);
        }}
        className="bg-success animate-bounce duration-[2000s] w-[50px] h-[50px] flex items-center justify-center rounded-full absolute right-6 bottom-6"
      >
        <FontAwesome5 name="whatsapp" size={24} color={colors.white} />
      </Pressable>
    </SafeAreaView>
  );
};

export default _layout;
