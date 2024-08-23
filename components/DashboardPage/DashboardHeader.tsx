import { View, Text } from "react-native";
import React, { useContext } from "react";
import IconButton from "../ui/IconButton";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import Avatar from "../ui/Avatar";
import { colors } from "@/constants/constants";
import { AppContext } from "../ContextProviders/AppContext";
import { useRouter } from "expo-router";

const DashboardHeader = () => {
  const { setNavOpen, user } = useContext(AppContext) as appContextT;
  const router = useRouter();

  function getPeriodofDay() {
    const date = new Date();
    const hour = date.getHours();
    if (hour >= 0 && hour < 12) {
      return "morning";
    } else if (hour >= 12 && hour < 16) {
      return "afternoon";
    } else if (hour >= 16 && hour < 20) {
      return "evening";
    } else {
      return "night";
    }
  }

  if (!user) {
    return null;
  }
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
        {` Good ${getPeriodofDay()}, ${user.firstName}`}
      </Text>
      <View className="flex flex-row w-fit space-x-5 items-center">
        <IconButton
          badge={1}
          action={() => {
            router.push("/dashboard/notifications");
          }}
        >
          <FontAwesome name="bell-o" size={40} color={colors.white} />
        </IconButton>
        <Avatar image={{ uri: user?.profilePic }} />
      </View>
    </View>
  );
};

export default DashboardHeader;
