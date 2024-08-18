import { View, Text } from "react-native";
import React from "react";
import Button from "../ui/Button";

const ServiceCard = ({
  heading,
  body,
  points,
  buttonText,
}: {
  heading: string;
  body: string;
  points: string[];
  buttonText: string;
}) => {
  return (
    <View className="w-full lg:w-1/3 p-2 ">
      <View className="p-2 bg-gray-text rounded-md space-y-2 lg:h-full flex flex-col justify-between">
        <View className="space-y-2">
          <Text className="font-medium text-18 text-black">{heading}</Text>
          <Text className="font-regular text-16 text-black">{body}</Text>
          {points.map((point, index) => (
            <View key={index} className="flex flex-row items-start space-x-2">
              <View className="p-1 bg-black rounded-full mt-2"></View>
              <Text className="font-regular text-16 text-black">{point}</Text>
            </View>
          ))}
        </View>

        <View className="px-4 pt-4 md:pt-6">
          <Button color="black" textColor="black" outlined>
            {buttonText}
          </Button>
        </View>
      </View>
    </View>
  );
};

export default ServiceCard;
