import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import Head from "expo-router/head";
import "@/assets/styles/tailwind.css";
import {
  useFonts,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import "react-native-url-polyfill/auto";
import { View } from "react-native";
import AppContextProvider from "@/components/ContextProviders/AppContext";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { colors } from "@/constants/constants";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
function getRates() {
  const gbpusd =
    "https://twelve-data1.p.rapidapi.com/exchange_rate?symbol=GBP%2FUSD";
  const gbpeur =
    "https://twelve-data1.p.rapidapi.com/exchange_rate?symbol=GBP%2FEUR";
  const gbpcad =
    "https://twelve-data1.p.rapidapi.com/exchange_rate?symbol=GBP%2FCAD";
  const gbpusdt =
    "https://twelve-data1.p.rapidapi.com/exchange_rate?symbol=GBP%2FUSDT";
  const gbpbtc =
    "https://twelve-data1.p.rapidapi.com/exchange_rate?symbol=GBP%2FBTC";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": process.env.EXPO_PUBLIC_Rapid_Api_Key as string,
      "x-rapidapi-host": "twelve-data1.p.rapidapi.com",
    },
  };
  console.log("Getting rates");
  try {
    fetch(gbpusd, options).then((res) => {
      res.json().then((j) => {
        j.rate && AsyncStorage.setItem("gbpusd", JSON.stringify(j));
      });
    });
    fetch(gbpeur, options).then((res) => {
      res.json().then((j) => {
        j.rate && AsyncStorage.setItem("gbpeur", JSON.stringify(j));
      });
    });
    fetch(gbpcad, options).then((res) => {
      res.json().then((j) => {
        j.rate && AsyncStorage.setItem("gbpcad", JSON.stringify(j));
      });
    });
    fetch(gbpusdt, options).then((res) => {
      res.json().then((j) => {
        j.rate && AsyncStorage.setItem("gbpusdt", JSON.stringify(j));
      });
    });
    fetch(gbpbtc, options).then((res) => {
      res.json().then((j) => {
        j.rate && AsyncStorage.setItem("gbpbtc", JSON.stringify(j));
      });
    });
  } catch (error) {
    console.error(error);
  }
}

export default function RootLayout() {
  const [loaded] = useFonts({
    light: Poppins_300Light,
    regular: Poppins_400Regular,
    italics: Poppins_400Regular_Italic,
    medium: Poppins_500Medium,
    bold: Poppins_700Bold,
  });
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);
  useEffect(() => {
    AsyncStorage.getItem("gbpbtc").then((value) => {
      if (value) {
        const data = JSON.parse(value);

        if (Date.now() - data.timestamp * 1000 > 1000 * 60 * 60 * 48) {
          getRates();
        }
      } else {
        getRates();
      }
    });
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <View className={"flex flex-1 w-screen bg-background"}>
      <AppContextProvider>
        <GestureHandlerRootView className="flex flex-1 bg-background">
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: colors.background },
            }}
          >
            <Stack.Screen name="+not-found" />
          </Stack>
        </GestureHandlerRootView>
      </AppContextProvider>
      <Toast />
    </View>
  );
}
