import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "@/components/ContextProviders/AppContext";

import DashboardMain from "@/components/DashboardPage/DashboardMain";
import { ActivityIndicator, Text, View } from "react-native";
import { account, database, databaseInfo } from "@/hooks/useAppWrite";
import { Query } from "appwrite";
import { usePathname, useRouter } from "expo-router";

const index = () => {
  const { user, setUser } = useContext(AppContext) as appContextT;
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();
  const path = usePathname();
  useEffect(() => {
    (!user || path === "/dashboard") &&
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
            setLoaded(true);
          } else {
            throw new Error("User fetching user");
          }
        })
        .catch((e) => {
          router.push("/login");
        });
  }, [user, path]);

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
