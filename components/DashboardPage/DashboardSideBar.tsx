import { View, Text, Image } from "react-native";
import React from "react";
import { PieChart } from "react-native-gifted-charts";
import DashboardHeadings from "./DashboardHeadings";
import { colors } from "@/constants/constants";

const DashboardSideBar = () => {
  const incomingLimit = [
    { value: 1, color: colors.primary },

    { value: 99, color: colors["gray-text"] },
  ];
  const outGoingLimit = [
    { value: 1, color: colors.primary },

    { value: 99, color: colors["gray-text"] },
  ];
  return (
    <View>
      <DashboardHeadings>Account Limits</DashboardHeadings>

      <View className="flex flex-row">
        <View className="w-1/2 flex flex-col items-center space-y-2">
          <Text className="font-semibold text-16 text-white">Incoming</Text>
          <PieChart
            donut
            innerRadius={30}
            radius={40}
            data={incomingLimit}
            centerLabelComponent={() => (
              <Text
                className={` ${
                  incomingLimit[0].value > 90 ? "text-danger" : "text-success"
                } font-regular`}
              >
                {incomingLimit[0].value + "% " + "full"}
              </Text>
            )}
          />
        </View>
        <View className="w-1/2 flex flex-col items-center space-y-2">
          <Text className="font-semibold text-16 text-white">Outgoing</Text>
          <PieChart
            donut
            innerRadius={30}
            radius={40}
            data={incomingLimit}
            centerLabelComponent={() => (
              <Text
                className={` ${
                  outGoingLimit[0].value > 90 ? "text-danger" : "text-success"
                } font-regular`}
              >
                {outGoingLimit[0].value + "% " + "full"}
              </Text>
            )}
          />
        </View>
      </View>
      <View className="mt-4 space-y-2">
        <DashboardHeadings>Forex rates</DashboardHeadings>
        <View className="flex flex-row border-black border-1">
          <View className="bg-black p-1">
            <Text className="text-white font-semibold text-14">GBP/USD</Text>
          </View>
          <View className="bg-gray-text flex-grow p-1">
            <Text className="text-black font-regular text-14">2.001</Text>
          </View>
        </View>
        <View className="flex flex-row border-black border-1">
          <View className="bg-black p-1">
            <Text className="text-white font-semibold text-14">GBP/EUR</Text>
          </View>
          <View className="bg-gray-text flex-grow p-1">
            <Text className="text-black font-regular text-14">1.991</Text>
          </View>
        </View>
        <View className="flex flex-row border-black border-1">
          <View className="bg-black p-1">
            <Text className="text-white font-semibold text-14">GBP/CAD</Text>
          </View>
          <View className="bg-gray-text flex-grow p-1">
            <Text className="text-black font-regular text-14">2.990</Text>
          </View>
        </View>
      </View>
      <View className="mt-4 space-y-2">
        <DashboardHeadings>Crypto rates</DashboardHeadings>
        <View className="flex flex-row border-black border-1">
          <View className="bg-black p-1">
            <Text className="text-white font-semibold text-14">GBP/BTC</Text>
          </View>
          <View className="bg-gray-text flex-grow p-1">
            <Text className="text-black font-regular text-14">2.001</Text>
          </View>
        </View>
        <View className="flex flex-row border-black border-1">
          <View className="bg-black p-1">
            <Text className="text-white font-semibold text-14">GBP/USDT</Text>
          </View>
          <View className="bg-gray-text flex-grow p-1">
            <Text className="text-black font-regular text-14">1.991</Text>
          </View>
        </View>
      </View>
      <View className="mt-4 space-y-2">
        <DashboardHeadings>Stock Markets </DashboardHeadings>
        <Text className="font-regular text-white text-16">
          Invest in leading profitable stock markets via UK Exchange Bank
        </Text>
        <View className="flex flex-row  items-center">
          <View className=" p-1">
            <Image
              style={{ width: 50, height: 50, borderRadius: 10 }}
              source={require("@/assets/images/tesla.png")}
            />
          </View>
          <View className=" flex-grow p-1 h-full">
            <Text className="text-primary font-medium text-16 md:text-24">
              Tesla
            </Text>
          </View>
        </View>
        <View className="flex flex-row  items-center">
          <View className=" p-1">
            <Image
              style={{ width: 50, height: 50, borderRadius: 10 }}
              source={require("@/assets/images/apple.png")}
            />
          </View>
          <View className=" flex-grow p-1 h-full">
            <Text className="text-primary font-medium text-16 md:text-24">
              Apple
            </Text>
          </View>
        </View>
        <View className="flex flex-row  items-center">
          <View className=" p-1">
            <Image
              style={{ width: 50, height: 50, borderRadius: 10 }}
              source={require("@/assets/images/amazon.png")}
            />
          </View>
          <View className=" flex-grow p-1 h-full">
            <Text className="text-primary font-medium text-16 md:text-24">
              Amazon
            </Text>
          </View>
        </View>
        <View className="flex flex-row  items-center">
          <View className=" p-1">
            <Image
              style={{ width: 50, height: 50, borderRadius: 10 }}
              source={require("@/assets/images/microsoft.png")}
            />
          </View>
          <View className=" flex-grow p-1 h-full">
            <Text className="text-primary font-medium text-16 md:text-24">
              Microsoft
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DashboardSideBar;
