import { View, Text, Image } from "react-native";
import React from "react";
import SupportCard from "./SupportCard";
import SectionHeading from "../ui/SectionHeading";
import { supports } from "@/constants/constants";

const SupportSection = () => {
  return (
    <View className="px-2 md:px-3 lg:px-6 py-6 lg:py-20 space-y-4">
      <SectionHeading>
        Supporting your business, every step of the way
      </SectionHeading>
      <Text className="font-regular text-gray-text text-16 text-center py-2">
        We’re here to help your business thrive. We’ve got the business funding
        and expert support that can help drive your business forward.
      </Text>
      <View className="flex flex-col lg:flex-row flex-wrap lg:items-stretch">
        {supports.map((support, index) => (
          <SupportCard
            key={index}
            image={support.icon}
            heading={support.heading}
            body={support.body}
          />
        ))}
      </View>
    </View>
  );
};

export default SupportSection;
