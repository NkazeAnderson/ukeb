import { View, Text } from "react-native";
import React from "react";
import Button from "../ui/Button";
import SectionHeading from "../ui/SectionHeading";
import ServiceCard from "./ServiceCard";
import { services } from "@/constants/constants";

const ServiceSection = () => {
  return (
    <View className="py-5 px-2 md:px-4 lg:px-6 space-y-4">
      <SectionHeading>
        Support and services that scale with your business. And a fee-free
        business account for the first 12 months*
      </SectionHeading>
      <Text className="text-center text-gray-text font-regular text-16">
        Thinking of banking with us? Our 12-month fee-free promise gives you an
        opportunity to try out our bank account, products, services and support
        – whether you’re a startup, a growing company or an established
        business.
      </Text>
      <View className="md:flex md:flex-row items-stretch">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            heading={service.heading}
            body={service.body}
            points={service.points}
            buttonText={service.buttonText}
          />
        ))}
      </View>
      <View>
        <Text className=" font-italics text-[14px] text-white ">
          *Fees are based on the type of business account you open with us. Any
          additional services you’d like to use may have their own fees. Account
          fees are free for your first 12 months as a new Barclays business
          account holder and start from £8.50 per month after that.
        </Text>
      </View>
    </View>
  );
};

export default ServiceSection;
