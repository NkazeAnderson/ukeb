import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useContext, useEffect } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { AppContext } from "../ContextProviders/AppContext";
import Button from "../ui/Button";
import { colors } from "@/constants/constants";
import { useRouter } from "expo-router";
import { isWeb } from "@/constants/environment";
import Avatar from "../ui/Avatar";

const NavBar = () => {
  const { user, navOpen, setNavOpen } = useContext(AppContext) as appContextT;
  const router = useRouter();
  useEffect(() => {
    isWeb &&
      window.addEventListener("resize", () => {
        window.innerWidth > 1000 && setNavOpen(false);
      });
  }, []);
  return (
    <View className="lg:px-[50px] lg:py-[10px] px-2 py-2 border-b-2 border-gray">
      <View className="flex flex-row justify-between items-center  bg-background">
        <TouchableOpacity
          className=" lg:hidden "
          onPress={() => {
            setNavOpen((prev) => !prev);
          }}
        >
          <Entypo
            name={navOpen ? "cross" : "menu"}
            size={50}
            color={navOpen ? colors.danger : colors.white}
          />
        </TouchableOpacity>
        <View className="w-[60px] h-[60px]">
          <View className="w-full h-full">
            <Image
              className="flex-1 aspect-video"
              resizeMode="contain"
              source={require("@/assets/images/ukeb-logo.png")}
            />
          </View>
        </View>
        {!user ? (
          <View>
            <Button
              color="primary"
              textColor="white"
              action={() => {
                router.push("/login");
              }}
            >
              Login
            </Button>
          </View>
        ) : (
          <View className="">
            <Avatar image={require("@/assets/images/no-dp.png")} />
          </View>
        )}
      </View>
      <View
        className={`py-4 space-y-3 lg:space-y-0 lg:space-x-4 lg:flex lg:flex-row ${
          navOpen ? "flex" : "hidden"
        } justify-center lg:items-center`}
      >
        <Text className=" font-medium text-white text-16 md:text-20 hover:text-primary hover:cursor-pointer underline underline-offset-2">
          Home
        </Text>
        <Text className=" font-medium text-white text-16 md:text-20 hover:text-primary hover:cursor-pointer underline underline-offset-2">
          Contact
        </Text>
        <Text className=" font-medium text-white text-16 md:text-20 hover:text-primary hover:cursor-pointer underline underline-offset-2">
          Business
        </Text>
        <Text className=" font-medium text-white text-16 md:text-20 hover:text-primary hover:cursor-pointer underline underline-offset-2">
          International Trade
        </Text>
        <Text className=" font-medium text-white text-16 md:text-20 hover:text-primary hover:cursor-pointer underline underline-offset-2">
          Debit and Credit Cards
        </Text>
      </View>
    </View>
  );
};

export default NavBar;
