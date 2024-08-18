import { View, Text, Image, ImageSourcePropType } from "react-native";
import React from "react";

const PubCard = (props: {
  heading: string;
  body: string;
  image: ImageSourcePropType;
  reverse?: boolean;
}) => {
  return (
    <View
      className={`flex flex-col ${
        props.reverse ? "md:flex-row" : "md:flex-row-reverse"
      }  my-4 md:my-9`}
    >
      <View className="p-4 md:p-10  w-full md:w-1/2">
        <Text className="text-24 md:text-32 font-medium text-gray-text ">
          {props.heading}
        </Text>
        <Text className="text-16 font-regular text-gray-text ">
          {props.body}
        </Text>
      </View>
      <View className="w-full md:w-1/2  bg-blue/10">
        <View className="w-full h-[250px] md:h-full">
          <Image
            className="flex-1 rounded"
            resizeMode="stretch"
            source={props.image}
          />
        </View>
      </View>
    </View>
  );
};

export default PubCard;
