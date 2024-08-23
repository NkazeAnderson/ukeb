import { View, Text, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { PieChart } from "react-native-gifted-charts";
import DashboardHeadings from "./DashboardHeadings";
import { colors } from "@/constants/constants";
import { AppContext } from "../ContextProviders/AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DashboardSideBar = () => {
  const { user } = useContext(AppContext) as appContextT;
  const [gbpusd, setgbpusd] = useState(0);
  const [gbpeur, setgbpeur] = useState(0);
  const [gbpcad, setgbpcad] = useState(0);
  const [gbpusdt, setgbpusdt] = useState(0);
  const [gbpbtc, setgbpbtc] = useState(0);
  const incomingLimit = [
    { value: user?.incomingLimit ?? 1, color: colors.primary },

    {
      value: user?.incomingLimit ? 100 - user?.incomingLimit : 99,
      color: colors["gray-text"],
    },
  ];
  const outGoingLimit = [
    { value: user?.outgoingLimit ?? 1, color: colors.primary },

    {
      value: user?.outgoingLimit ? 100 - user?.outgoingLimit : 99,
      color: colors["gray-text"],
    },
  ];
  useEffect(() => {
    AsyncStorage.getItem("gbpusd").then((r) => {
      r && setgbpusd(JSON.parse(r).rate);
    });
    AsyncStorage.getItem("gbpusdt").then((r) => {
      r && setgbpusdt(JSON.parse(r).rate);
    });
    AsyncStorage.getItem("gbpeur").then((r) => {
      r && setgbpeur(JSON.parse(r).rate);
    });
    AsyncStorage.getItem("gbpcad").then((r) => {
      r && setgbpcad(JSON.parse(r).rate);
    });
    AsyncStorage.getItem("gbpbtc").then((r) => {
      r && setgbpbtc(JSON.parse(r).rate);
    });
  }, []);

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
            <Text className="text-black font-regular text-14">{gbpusd}</Text>
          </View>
        </View>
        <View className="flex flex-row border-black border-1">
          <View className="bg-black p-1">
            <Text className="text-white font-semibold text-14">GBP/EUR</Text>
          </View>
          <View className="bg-gray-text flex-grow p-1">
            <Text className="text-black font-regular text-14">{gbpeur}</Text>
          </View>
        </View>
        <View className="flex flex-row border-black border-1">
          <View className="bg-black p-1">
            <Text className="text-white font-semibold text-14">GBP/CAD</Text>
          </View>
          <View className="bg-gray-text flex-grow p-1">
            <Text className="text-black font-regular text-14">{gbpcad}</Text>
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
            <Text className="text-black font-regular text-14">{gbpbtc}</Text>
          </View>
        </View>
        <View className="flex flex-row border-black border-1">
          <View className="bg-black p-1">
            <Text className="text-white font-semibold text-14">GBP/USDT</Text>
          </View>
          <View className="bg-gray-text flex-grow p-1">
            <Text className="text-black font-regular text-14">{gbpusdt}</Text>
          </View>
        </View>
      </View>
      <View className="mt-4 space-y-2">
        <DashboardHeadings>Stock Markets </DashboardHeadings>
        <Text className="font-regular text-white text-16">
          Invest in leading profitable stock markets via UK Metropolitan Bank
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
