import { View, Text, Pressable } from "react-native";
import React from "react";

const SideMenuButton = ({
  text,
  children,
}: {
  text: string;
  children: React.ReactNode;
}) => {
  return (
    <Pressable className="hover:border-primary hover:text-primary  border-y-2 flex flex-row p-2 border-gray-text items-center space-x-2">
      <View className="w-[20px]">{children}</View>
      <Text className="font-medium capitalize text-14 text-gray-text">
        {text}
      </Text>
    </Pressable>
  );
};

export default SideMenuButton;
