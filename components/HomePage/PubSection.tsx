import { View, Text, Image } from "react-native";
import React from "react";
import PubCard from "./PubCard";

const PubSection = () => {
  return (
    <View className="px-2 md:px-3 lg:px-6">
      <PubCard
        heading="Get support and guidance from Eagle Labs experts"
        body=" From startups to scaleups and private investors, Eagle Labs connects
          founders with an ecosystem that can help accelerate ideas and growth.
          Eagle Labs supports entrepreneurs with free access to dedicated growth
          programmes, virtual and in person one-to-one mentoring, masterclasses
          with industry experts, plus live events and access to Eagle Labs
          Academy. The Academy covers all aspects of launching and running a
          business, from how to find and hire the best people to how to raise
          finance and more."
        image={require("@/assets/images/eagle-labs.png")}
      />
      <PubCard
        heading="Enjoy the added benefits of Barclaycard Payments"
        body="With expertise in making and taking payments, Barclaycard Payments can help you reach new customers, streamline processes, unlock cashflow and more, whatever your business size, sector, or ambition. Subject to application, financial circumstances and borrowing history. T&Cs Apply."
        image={require("@/assets/images/swipe-card.png")}
        reverse
      />
    </View>
  );
};

export default PubSection;
