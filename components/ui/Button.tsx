import { View, Text } from "react-native";
import React from "react";
import { colors } from "@/constants/constants";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Button({
  children,
  outlined,
  color,
  textColor,
  action = () => {
    console.log("pressed");
  },
}: {
  children: React.ReactNode;
  outlined?: boolean;
  action?: () => void;
  color: "white" | "black" | "primary" | "secondary";
  textColor: "white" | "black" | "primary" | "secondary";
}) {
  return (
    <TouchableOpacity
      className={`w-full hover:cursor-pointer    px-6 py-2
         ${
           color === "white" && !outlined
             ? "bg-white"
             : color === "white" && outlined
             ? " border-2 border-white"
             : ""
         }  
         ${
           color === "secondary" && !outlined
             ? "bg-secondary"
             : color === "secondary" && outlined
             ? " border-2 border-secondary"
             : ""
         }  
         ${
           color === "black" && !outlined
             ? "bg-black"
             : color === "black" && outlined
             ? " border-2 border-black"
             : ""
         }  
         ${
           color === "primary" && !outlined
             ? "bg-primary"
             : color === "primary" && outlined
             ? " border-2 border-primary"
             : ""
         }  
        
      rounded-[30px] hover:opacity-80`}
      onPress={() => {
        action && action();
      }}
    >
      <Text
        className={`text-primary text-center font-medium text-16 
          ${textColor === "white" && "text-white"}
          ${textColor === "primary" && "text-primary"}
          ${textColor === "secondary" && "text-secondary"}
          ${textColor === "black" && "text-black"}
      `}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}
