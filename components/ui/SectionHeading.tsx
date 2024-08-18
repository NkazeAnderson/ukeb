import { View, Text } from "react-native";
import React from "react";

const SectionHeading = ({ children }: { children: React.ReactNode }) => {
  return (
    <View className="flex flex-row justify-center">
      <Text className=" max-w-[75%] text-center font-medium text-24 md:text-32 text-white">
        {children}
      </Text>
    </View>
  );
};

export default SectionHeading;
