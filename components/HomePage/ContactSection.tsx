import { View, Text } from "react-native";
import React from "react";
import Button from "../ui/Button";
import { useRouter } from "expo-router";

const ContactSection = () => {
  const router = useRouter();
  return (
    <View className="bg-[#001276] py-8 px-2 md:px-4 lg:px-6">
      <Text className=" px-[15%] text-24 text-center md:text-32 text-primary font-medium">
        For more information about our business tariffs, please see our rates
        and charges
      </Text>
      <Text className="text-center text-16 font-regular text-gray-text">
        Alternatively, use our UK Metropolitan Business Account tariff
        calculator to find out how much your charges could be and see how much
        you could save.
      </Text>
      <View className="flex flex-col md:flex-row items-center justify-center ">
        <View className="w-1/2 md:w-1/4 lg:w-1/6">
          <View className="p-2">
            <Button
              color="primary"
              textColor="white"
              action={() => {
                router.push("/contact-us");
              }}
            >
              Message Us
            </Button>
          </View>
        </View>
        <View className="w-1/2 md:w-1/4 lg:w-1/6 my-2">
          <View className="p-2">
            <Button
              outlined
              color="primary"
              textColor="primary"
              action={() => {
                router.push("/contact-us");
              }}
            >
              Email Us
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ContactSection;
