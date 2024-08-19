import { View, Text } from "react-native";
import React, { useContext } from "react";
import IconButton from "../ui/IconButton";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import Avatar from "../ui/Avatar";
import { colors } from "@/constants/constants";
import { AppContext } from "../ContextProviders/AppContext";

const DashboardHeader = () => {
  const { setNavOpen } = useContext(AppContext) as appContextT;
  return (
    <View className="flex flex-row items-center justify-between">
      <View>
        <IconButton
          action={() => {
            setNavOpen((prev) => !prev);
          }}
        >
          <Entypo name="menu" size={40} color={colors.white} />
        </IconButton>
      </View>
      <Text className="font-medium text-18 text-white max-w-[75%] capitalize">
        Good Morning, Wale
      </Text>
      <View className="flex flex-row w-fit space-x-5 items-center">
        <IconButton badge={10}>
          <FontAwesome name="bell-o" size={40} color={colors.white} />
        </IconButton>
        <Avatar image={require("@/assets/images/no-dp.png")} />
      </View>
    </View>
  );
};

export default DashboardHeader;
