import { View, Text } from "react-native";
import React, { useContext } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { colors } from "@/constants/constants";
import Avatar from "@/components/ui/Avatar";
import IconButton from "@/components/ui/IconButton";
import Entypo from "@expo/vector-icons/Entypo";
import { AppContext } from "@/components/ContextProviders/AppContext";
import DashboardNav from "@/components/navBar/DashboardNav";
import DashboardHeader from "@/components/DashboardPage/DashboardHeader";
import DashboardMain from "@/components/DashboardPage/DashboardMain";
const index = () => {
  const { navOpen, setNavOpen } = useContext(AppContext) as appContextT;
  return (
    <View className="flex flex-1 bg-background relative ">
      <SafeAreaView className="h-full">
        <View className=" flex flex-row h-full">
          <DashboardNav />
          <View className="flex flex-1 px-2 md:px-3 lg:px-6">
            <DashboardHeader />
            <DashboardMain />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default index;
