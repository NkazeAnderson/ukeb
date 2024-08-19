import { View, Text, Pressable } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "@/constants/constants";
import { Icon } from "@expo/vector-icons/build/createIconSet";

const IconButton = ({
  children,
  badge,
  action,
}: {
  children: React.ReactNode;
  badge?: number;
  action?: () => void;
}) => {
  return (
    <Pressable
      className="relative"
      onPress={() => {
        action && action();
      }}
    >
      {children}
      {badge && badge > 0 && (
        <View className="flex items-center justify-center rounded-full bg-danger  w-4 h-4 absolute right-0 top-0">
          <Text className="text-white font-light text-[10px]">
            {String(badge)}
          </Text>
        </View>
      )}
    </Pressable>
  );
};

export default IconButton;
