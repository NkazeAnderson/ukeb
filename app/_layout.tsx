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
  Poppins_700Bold
  
} from '@expo-google-fonts/poppins';

import { useColorScheme } from "@/hooks/useColorScheme";
import { View } from "react-native";
import AppContextProvider from "@/components/ContextProviders/AppContext";
import NavBar from "@/components/navBar/NavBar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { colors } from "@/constants/constants";
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
   light: Poppins_300Light, regular:Poppins_400Regular, italics: Poppins_400Regular_Italic, medium:Poppins_500Medium, bold: Poppins_700Bold
  });
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <View className={"flex flex-1 w-screen bg-background"}>
      <AppContextProvider>
        <GestureHandlerRootView className="flex flex-1 bg-background">
          
    <Stack screenOptions={{headerShown:false, contentStyle:{backgroundColor:colors.background}}}>
        <Stack.Screen name="+not-found" />
      </Stack>
   </GestureHandlerRootView>
      </AppContextProvider>
    </View>
  );
}
