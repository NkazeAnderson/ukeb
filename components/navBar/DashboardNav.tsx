import { View, Text, Image, Pressable } from "react-native";
import React, { useContext, useState } from "react";
import { AppContext } from "../ContextProviders/AppContext";
import IconButton from "../ui/IconButton";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { colors } from "@/constants/constants";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Avatar from "../ui/Avatar";
import Button from "../ui/Button";
import SideMenuButton from "../ui/SideMenuButton";
import { useRouter } from "expo-router";
import { account } from "@/hooks/useAppWrite";
import Toast from "react-native-toast-message";
import useToast from "@/hooks/useToast";

const DashboardNav = () => {
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const { navOpen, setNavOpen, user, setUser, bankInfo } = useContext(
    AppContext
  ) as appContextT;
  if (!user) {
    return null;
  }
  return (
    <View
      className={`w-4/5 absolute z-10 h-full bg-background  ${
        navOpen ? "right-1/5 " : "right-full"
      }  lg:relative lg:right-0  lg:w-1/5 pl-2 md:pl-3 lg:pl-6`}
    >
      <View className="bg-[#0d174b] h-full p-2 ">
        {navOpen && (
          <IconButton
            action={() => {
              setNavOpen(false);
            }}
          >
            <Entypo name="cross" size={40} color={colors.danger} />
          </IconButton>
        )}
        <View className="flex flex-col items-center justify-center">
          <Image
            style={{ width: 100, resizeMode: "contain" }}
            source={require("@/assets/images/ukeb-logo.png")}
          />
          <Text className="font-regular text-16 text-secondary capitalize text-center">
            Business Account
          </Text>
          <Text className="font-regular text-white text-20  capitalize text-center">
            UK Metropolitan Bank
          </Text>
          <View className="flex flex-row space-x-3 items-center">
            <Text className="font-regular text-16 text-white capitalize text-center py-3">
              {`${user.firstName} ${user.lastName}`}
            </Text>
            <MaterialIcons name="verified" size={16} color={colors.success} />
          </View>
        </View>
        <View className="flex  flex-col justify-between flex-grow ">
          <View className="space-y-2">
            <SideMenuButton text="Dashboard" route={"/dashboard"}>
              <MaterialIcons
                name="dashboard"
                size={14}
                color={colors["gray-text"]}
              />
            </SideMenuButton>
            <SideMenuButton text="Banking Cards" route={"/dashboard/cards"}>
              <FontAwesome
                name="credit-card-alt"
                size={14}
                color={colors.white}
              />
            </SideMenuButton>
            <SideMenuButton text="Loans" route={"/dashboard/loans"}>
              <MaterialIcons
                name="currency-pound"
                size={14}
                color={colors.white}
              />
            </SideMenuButton>
            <SideMenuButton text="Settings" route={"/dashboard/settings"}>
              <FontAwesome name="gear" size={14} color={colors.white} />
            </SideMenuButton>
          </View>
          <View className="">
            <SideMenuButton
              text="Contact Agent"
              route={`https://wa.me/+${bankInfo.whatsapp}`}
            >
              <MaterialCommunityIcons
                name="face-agent"
                size={14}
                color={colors.white}
              />
            </SideMenuButton>
          </View>
          <View>
            <Button
              color="secondary"
              textColor="white"
              pending={pending}
              action={() => {
                setPending(true);
                try {
                  account
                    .deleteSession("current")
                    .then(() => {
                      router.replace("/");
                      setUser(undefined);
                      setPending(false);
                      useToast({
                        type: "success",
                        text1: "Logged Out",
                        text2: "You are now logged out",
                      });
                    })
                    .catch((e) => {
                      router.replace("/");
                    });
                } catch (error) {
                  router.replace("/");
                }
              }}
            >
              Log Out
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DashboardNav;
