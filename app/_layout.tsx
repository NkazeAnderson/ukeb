import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useRef } from "react";
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
  const googleTranslateRef = useRef(null);
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
    let intervalId: undefined | number | NodeJS.Timeout = undefined;
    const checkGoogleTranslate = () => {
      if (
        //@ts-ignore
        window.google &&
        //@ts-ignore
        window.google.translate &&
        //@ts-ignore
        window.google.translate.TranslateElement.InlineLayout
      ) {
        clearInterval(intervalId);
        //@ts-ignore
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages:
              "af,ach,ak,am,ar,az,be,bem,bg,bh,bn,br,bs,ca,chr,ckb,co,crs,cs,cy,da,de,ee,el,en,eo,es,es-419,et,eu,fa,fi,fo,fr,fy,ga,gaa,gd,gl,gn,gu,ha,haw,hi,hr,ht,hu,hy,ia,id,ig,is,it,iw,ja,jw,ka,kg,kk,km,kn,ko,kri,ku,ky,la,lg,ln,lo,loz,lt,lua,lv,mfe,mg,mi,mk,ml,mn,mo,mr,ms,mt,ne,nl,nn,no,nso,ny,nyn,oc,om,or,pa,pcm,pl,ps,pt-BR,pt-PT,qu,rm,rn,ro,ru,rw,sd,sh,si,sk,sl,sn,so,sq,sr,sr-ME,st,su,sv,sw,ta,te,tg,th,ti,tk,tl,tn,to,tr,tt,tum,tw,ug,uk,ur,uz,vi,wo,xh,yi,yo,zh-CN,zh-TW,zu",
            layout:
              //@ts-ignore
              window.google.translate.TranslateElement.InlineLayout.VERTICAL,
          },
          googleTranslateRef.current
        );
      }
    };
    intervalId = setInterval(checkGoogleTranslate, 100);
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <View className={"flex flex-1 w-screen max-w-[100vw] bg-background"}>
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
      <View ref={googleTranslateRef}></View>
    </View>
  );
}
