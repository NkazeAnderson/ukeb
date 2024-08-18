import { View, Text, Image, ImageSourcePropType } from "react-native";
import React from "react";

const SupportCard = ({
  image,
  heading,
  body,
}: {
  image: ImageSourcePropType;
  heading: string;
  body: string;
}) => {
  return (
    <View className="w-full md:w-1/2 lg:w-1/3 p-1 space-y-4 ">
      <View className="rounded-lg p-2 md:p-4 lg:p-6 md:h-full bg-gray">
        <View className="flex flex-row">
          <View className="w-[60px] h-[60px]">
            <Image
              className="flex-1"
              resizeMode="contain"
              resizeMethod="resize"
              source={image}
            />
          </View>
        </View>
        <Text className="font-medium text-18 md:text-24 text-white">
          {heading}
        </Text>
        <Text className="font-regular text-gray-text text-16">{body}</Text>
      </View>
    </View>
  );
};

export default SupportCard;
