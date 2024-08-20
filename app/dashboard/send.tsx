import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import InputComponent from "@/components/ui/InputComponent";
import Button from "@/components/ui/Button";

const send = () => {
  const [width, setWidth] = useState(0);
  return (
    <View className="flex flex-1 bg-background relative">
      <View
        className="absolute w-full h-full"
        onLayout={(e) => {
          const w = e.nativeEvent.layout.width;
          setWidth(w);
        }}
      >
        <Image
          style={{ width: width }}
          className="h-full"
          resizeMode="stretch"
          source={require("@/assets/images/send-bg.png")}
        />
      </View>
      <View>
        <Text className="font-bold text-24 md:text-32 text-secondary text-center">
          Send Money
        </Text>
        <View className="p-5 ">
          <View className="border-2 border-secondary rounded-lg p-2">
            <Text className="text-24 font-medium text-white">
              Where do you want to send money to?
            </Text>
            <View className="md:w-3/4">
              <InputComponent label="Account Number" whiteBg />
              <InputComponent label="Swift Code" whiteBg />
              <InputComponent label="Amount" whiteBg />
              <InputComponent label="Purpose" whiteBg />
              <View className="">
                <Text className="text-16 font-regular text-primary">
                  For Business? <Text className="text-[10px] ">Escrow</Text>
                </Text>
                <View className="flex flex-row w-[50px] h-[20px] p-1 border-2 border-secondary rounded-full">
                  <View className="w-1/2 h-full bg-success rounded-full"></View>
                </View>
              </View>
            </View>
            <View className="px-[25%] md:px-[35%] mt-5">
              <Button color="primary" textColor="white">
                Send
              </Button>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default send;
