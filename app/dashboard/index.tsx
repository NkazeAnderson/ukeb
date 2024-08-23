import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "@/components/ContextProviders/AppContext";

import DashboardMain from "@/components/DashboardPage/DashboardMain";
import { ActivityIndicator, Text, View } from "react-native";
import { account, database, databaseInfo } from "@/hooks/useAppWrite";
import { Query } from "appwrite";
import { useRouter } from "expo-router";

const index = () => {
  const { user } = useContext(AppContext) as appContextT;

  if (!user) {
    return (
      <View className="flex flex-1 items-center justify-center">
        <Text className={"font-medium text-20"}>Loading...</Text>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <View className="flex flex-1 bg-background">
      <DashboardMain />
    </View>
  );
};

export default index;
