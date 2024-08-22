import { View, Text, StyleSheet, Image } from "react-native";
import React, { useContext } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "@/constants/constants";
import { AppContext } from "../ContextProviders/AppContext";

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 300,
  },
});
const CreditCard = () => {
  const { user } = useContext(AppContext) as appContextT;
  return (
    <View className="w-[340px] h-[230px] p-4 bg-primary rounded-2xl overflow-hidden">
      <LinearGradient
        // Background Linear Gradient
        colors={["transparent", colors.secondary]}
        style={styles.background}
      />
      <View className="bg-primary/10 w-full h-full rounded-full absolute -right-1/2 bottom-1/2"></View>
      <View className="bg-primary/20 w-full h-full rounded-full absolute -left-1/2 top-1/2"></View>
      <View className="flex flex-1 justify-between">
        <View className="flex flex-row justify-between">
          <View>
            <Text className="font-medium text-white text-20">Balance</Text>
            <Text className="font-medium text-white text-32">$ 0</Text>
          </View>
          <View className="">
            <View className="bg-white rounded">
              <Image
                style={{ width: 60, height: 50, borderRadius: 10 }}
                source={require("@/assets/images/visa.png")}
              />
            </View>
          </View>
        </View>
        <View className="flex flex-row justify-between items-end">
          <View>
            <Text className="font-medium text-white text-14">{`${user?.firstName} ${user?.lastName}`}</Text>
            <Text className="font-regular text-white text-14">
              {user?.cardNumber ?? "XXXX XXXX XXXX XXXX"}
            </Text>
            <Text className="font-regular text-white text-14">
              {user?.cardExpMonthYear ?? "XX/XX"}
            </Text>
          </View>
          <View>
            <Text className="font-regular text-white text-14">
              {user?.cardCVV ?? "XXX"}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CreditCard;
