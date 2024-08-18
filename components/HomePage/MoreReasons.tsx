import { View, Text, Image } from "react-native";
import React from "react";
import SupportCard from "./SupportCard";
import SectionHeading from "../ui/SectionHeading";
import MoreReasonCard from "./MoreReasonCard";
import { moreReasons } from "@/constants/constants";

const MoreReasons = () => {
  return (
    <View className="px-2 md:px-3 lg:px-6 py-6 lg:py-20 space-y-4 bg-gray">
      <SectionHeading>More reasons to choose us</SectionHeading>
      <Text className="font-regular text-gray-text text-16 text-center py-2">
        We thrive on relationships with our customers, and we’re committed to
        building trust. That’s why we’re dedicated to offering you more than
        just banking.
      </Text>
      <View className="flex flex-col md:flex-row md:flex-wrap">
        {moreReasons.map((reason, index) => (
          <MoreReasonCard
            key={index}
            image={reason.image}
            heading={reason.heading}
            body={reason.body}
          />
        ))}
      </View>
    </View>
  );
};

export default MoreReasons;
