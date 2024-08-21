import { View, Text, Image } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import Footer from "@/components/Footer/Footer";

const aboutUS = () => {
  return (
    <View className="flex flex-1  bg-background p-2 px-2 md:px-3 lg:px-6">
      <ScrollView className="flex flex-1 ">
        <Text className="pb-5 font-bold text-white text-32 lg:text-48 text-center">
          About Us
        </Text>
        <View className=" pb-5 flex flex-col md:flex-row">
          <View className="w-full md:w-1/2">
            <Image
              style={{ width: "100%", height: 300 }}
              resizeMode="contain"
              source={require("@/assets/images/about-woman.jpg")}
            />
          </View>
          <View className="w-full md:w-1/2">
            <Text className="font-bold text-white text-24 lg:text-32">
              Who are we?
            </Text>
            <Text className="font-regular text-white text-16 ">
              Our vision is to be the UK-centred leader in global finance. We
              are a diversified bank with comprehensive UK consumer, corporate
              and wealth and private banking franchises, a leading investment
              bank and a strong, specialist US consumer bank. Through these five
              divisions, we are working together for a better financial future
              for our customers, clients and communities.
            </Text>
          </View>
        </View>
        <Text className="my-2 font-bold text-white text-24 text-center lg:text-32">
          Our strategy
        </Text>
        <View className="pb-5 flex flex-col lg:flex-row">
          <View className="flex flex-col w-full p-1 lg:w-1/3 ">
            <Text className="font-medium text-16 text-secondary">
              Performance
            </Text>
            <View className="w-full ">
              <Image
                style={{ width: "100%", height: 200 }}
                source={require("@/assets/images/about-Perform.jpg")}
              />
            </View>
            <View className="w-full ">
              <Text className="font-regular text-white text-16 ">
                The Balanced Scorecard defines what we need to achieve over the
                next five years.
              </Text>
            </View>
          </View>
          <View className="flex flex-col p-1  lg:w-1/3 ">
            <Text className="font-medium text-16 text-secondary">
              Investor Update 2024
            </Text>
            <View className="w-full ">
              <Image
                style={{ width: "100%", height: 200 }}
                source={require("@/assets/images/investors.jpg")}
              />
            </View>
            <View className="w-full ">
              <Text className="font-regular text-white text-16 ">
                Ukeb aims to become Simpler, Better and More balanced. This will
                enable us to improve our customer service, provide more support
                to consumers and businesses, deliver higher quality income
                growth, and build returns.
              </Text>
            </View>
          </View>
          <View className="flex flex-col p-1  lg:w-1/3 ">
            <Text className="font-medium text-16 text-secondary">
              Diversity, Equity and Inclusion
            </Text>
            <View className="w-full ">
              <Image
                style={{ width: "100%", height: 200 }}
                source={require("@/assets/images/diversity.jpg")}
              />
            </View>
            <View className="w-full ">
              <Text className="font-regular text-white text-16 ">
                We believe every one of our employees, clients and stakeholders
                brings a set of unique talents and perspectives to the table.
              </Text>
            </View>
          </View>
        </View>
        <Text className="font-bold py-3 text-center text-white text-24 lg:text-32">
          Our governance
        </Text>
        <View className="flex flex-col md:flex-row">
          <View className="w-full md:w-1/2 md:h-[100px]">
            <Image
              style={{ width: "100%", height: 300 }}
              source={require("@/assets/images/gorvenance.jpg")}
            />
          </View>
          <View className="w-full md:w-1/2 p-2">
            <Text className="font-regular text-white text-16 ">
              The Board’s principal duty is to create and deliver sustainable
              shareholder value through setting Barclays' strategy and
              overseeing its implementation. Certain responsibilities are
              delegated to Board Committees, which assist the Board in carrying
              out its functions and ensure that there is independent oversight
              of internal control and risk management.
            </Text>
          </View>
        </View>
        <Footer />
      </ScrollView>
    </View>
  );
};

export default aboutUS;
