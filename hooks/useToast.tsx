import { View, Text } from "react-native";
import React from "react";
import Toast, { ToastShowParams } from "react-native-toast-message";
import { colors } from "@/constants/constants";

const useToast = ({
  text1,
  text2,
  type,
}: Required<Pick<ToastShowParams, "text1" | "text2" | "type">>) => {
  return Toast.show({
    text1,
    text2,
    text1Style: {
      fontFamily: "medium",
      fontSize: 18,
      color: type === "success" ? colors.success : colors.danger,
    },
    text2Style: {
      fontFamily: "regular",
      fontSize: 14,
      color: colors.black,
    },
  });
};

export default useToast;
