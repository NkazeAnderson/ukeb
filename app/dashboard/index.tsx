import React, { useContext } from "react";
import { AppContext } from "@/components/ContextProviders/AppContext";

import DashboardMain from "@/components/DashboardPage/DashboardMain";
import { View } from "react-native";

const index = () => {
  const { navOpen, setNavOpen } = useContext(AppContext) as appContextT;
  return (
    <View className="flex flex-1 bg-background">
      <DashboardMain />
    </View>
  );
};

export default index;
