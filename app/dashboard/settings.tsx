import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import DashboardHeadings from "@/components/DashboardPage/DashboardHeadings";
import Button from "@/components/ui/Button";
import InputComponent from "@/components/ui/InputComponent";
import { ScrollView } from "react-native-gesture-handler";

const languages = ["English", "French", "Spanish", "Italian"];
const currencies = ["Pounds", "Euro", "US Dollars"];
const settings = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState(0);
  const CheckBox = ({
    index,
    setMemo,
    values,
    memo,
  }: {
    index: number;
    memo: number;
    values: any[];
    setMemo: React.Dispatch<React.SetStateAction<number>>;
  }) => {
    return (
      <Pressable
        className=" flex flex-row items-center space-x-2 my-1"
        onPress={() => {
          setMemo(index);
        }}
      >
        <View className="w-4 h-4 p-0.5 border-2 border-secondary rounded">
          <View
            className={`${index === memo ? "bg-primary" : ""} w-full h-full`}
          ></View>
        </View>
        <Text className="font-regular text-16 text-white">{values[index]}</Text>
      </Pressable>
    );
  };
  return (
    <View className="flex flex-1 bg-background p-4 py-2 space-y-2">
      <ScrollView className="p-2">
        <DashboardHeadings centered>Settings</DashboardHeadings>
        <Text className=" font-medium text-primary text-18">
          Select your preferred language
        </Text>
        <View>
          {languages.map((item, index) => (
            <CheckBox
              index={index}
              memo={selectedLanguage}
              setMemo={setSelectedLanguage}
              values={languages}
            />
          ))}
        </View>
        <Text className=" font-medium text-primary text-18">
          Select your preferred currency
        </Text>
        <View>
          {currencies.map((item, index) => (
            <CheckBox
              index={index}
              memo={selectedCurrency}
              setMemo={setSelectedCurrency}
              values={currencies}
            />
          ))}
        </View>
        <Text className=" font-medium text-primary text-18">
          Update profile pictures
        </Text>
        <View className="w-1/2">
          <Button color="primary" textColor="white">
            Change
          </Button>
        </View>
        <Text className=" font-medium text-white text-18">
          Update shipping address
        </Text>
        <InputComponent label="Shipping Address" whiteBg />
        <View className="flex flex-row justify-between ">
          <View className="w-1/2 md:w-1/4 p-1">
            <Button color="primary" textColor="white">
              Save Changes
            </Button>
          </View>
          <View className="w-1/2 md:w-1/4 p-1">
            <Button color="danger" textColor="white">
              Delete Account
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default settings;
