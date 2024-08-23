import { View, Text } from "react-native";
import React, { useContext, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import DashboardNav from "@/components/navBar/DashboardNav";
import DashboardHeader from "@/components/DashboardPage/DashboardHeader";
import { Stack, useRouter } from "expo-router";
import { account, database, databaseInfo } from "@/hooks/useAppWrite";
import { Query } from "appwrite";
import { AppContext } from "@/components/ContextProviders/AppContext";

const _layout = () => {
  const { setUser, refereshUserInfo } = useContext(AppContext) as appContextT;
  const router = useRouter();
  useEffect(() => {
    account
      .get()
      .then(async (res) => {
        const userData = await database.listDocuments(
          databaseInfo.id, // databaseId
          databaseInfo.collections.users, // collectionId
          [Query.equal("email", res.email)] // queries (optional)
        );

        if (userData.total === 1) {
          console.log("total 1");

          //@ts-expect-error uset
          setUser(userData.documents[0] as userT);
        } else {
          throw new Error("User fetching user");
        }
      })
      .catch((e) => {
        router.push("/login");
      });
  }, [refereshUserInfo]);
  return (
    <View className="flex flex-1 bg-background relative ">
      <SafeAreaView className="h-full">
        <View className=" flex flex-row h-full">
          <DashboardNav />

          <View className="flex flex-1 px-2 md:px-3 lg:px-6 bg-background">
            <DashboardHeader />

            <Stack screenOptions={{ headerShown: false }} />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default _layout;
