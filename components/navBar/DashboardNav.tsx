import { View, Text, Image, Pressable } from "react-native";
import React, { useContext } from "react";
import { AppContext } from "../ContextProviders/AppContext";
import IconButton from "../ui/IconButton";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { colors, user } from "@/constants/constants";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Avatar from "../ui/Avatar";
import Button from "../ui/Button";
import SideMenuButton from "../ui/SideMenuButton";

const DashboardNav = () => {
  const { navOpen, setNavOpen } = useContext(AppContext) as appContextT;
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
            UK Exchange Bank
          </Text>
          <View className="flex flex-row space-x-3 items-center">
            <Text className="font-regular text-16 text-white capitalize text-center py-3">
              Wale Wale
            </Text>
            <MaterialIcons name="verified" size={16} color={colors.success} />
          </View>
        </View>
        <View className="flex  flex-col justify-between flex-grow ">
          <View className="space-y-2">
            <SideMenuButton text="Dashboard">
              <MaterialIcons
                name="dashboard"
                size={14}
                color={colors["gray-text"]}
              />
            </SideMenuButton>
            <SideMenuButton text="Banking Cards">
              <FontAwesome
                name="credit-card-alt"
                size={14}
                color={colors.white}
              />
            </SideMenuButton>
            <SideMenuButton text="Loans">
              <MaterialIcons
                name="currency-pound"
                size={14}
                color={colors.white}
              />
            </SideMenuButton>
            <SideMenuButton text="Settings">
              <FontAwesome name="gear" size={14} color={colors.white} />
            </SideMenuButton>
          </View>
          <View className="">
            <SideMenuButton text="Contact Agent">
              <MaterialCommunityIcons
                name="face-agent"
                size={14}
                color={colors.white}
              />
            </SideMenuButton>
          </View>
          <View>
            <Button color="secondary" textColor="white">
              Log Out
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DashboardNav;
