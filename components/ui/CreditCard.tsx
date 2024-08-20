import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "@/constants/constants";

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
            <Text className="font-medium text-white text-14">Wale Wale</Text>
            <Text className="font-regular text-white text-14">
              4019 1662 1662 7255
            </Text>
            <Text className="font-regular text-white text-14">11/26</Text>
          </View>
          <View>
            <Text className="font-regular text-white text-14">253</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CreditCard;
