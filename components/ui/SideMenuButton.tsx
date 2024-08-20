import { View, Text, Pressable } from "react-native";
import React from "react";
import { Href, useRouter } from "expo-router";

const SideMenuButton = ({
  text,
  children,
  route,
}: {
  text: string;
  children: React.ReactNode;
  route: Href<string | object>;
}) => {
  const router = useRouter();
  return (
    <Pressable
      className="hover:border-primary hover:text-primary  border-y-2 flex flex-row p-2 border-gray-text items-center space-x-2"
      onPress={() => {
        router.push(route);
      }}
    >
      <View className="w-[20px]">{children}</View>
      <Text className="font-medium capitalize text-14 text-gray-text">
        {text}
      </Text>
    </Pressable>
  );
};

export default SideMenuButton;
