import { View, Text } from "react-native";
import React from "react";
import { colors } from "@/constants/constants";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Button({
  children,
  outlined,
  color,
  textColor,
  pending,
  action = () => {
    console.log("pressed");
  },
}: {
  children: React.ReactNode;
  pending?: boolean;
  outlined?: boolean;
  action?: () => void;
  color: "white" | "black" | "primary" | "secondary" | "danger";
  textColor: "white" | "black" | "primary" | "secondary";
}) {
  return (
    <TouchableOpacity
      className={`w-full relative ${
        pending ? "hover:cursor-progress " : "hover:cursor-pointer"
      }   px-6 py-2
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
         ${
           color === "danger" && !outlined
             ? "bg-danger"
             : color === "danger" && outlined
             ? " border-2 border-danger"
             : ""
         }  
        
      rounded-[30px] hover:opacity-80`}
      onPress={() => {
        if (pending) {
          return;
        }
        action && action();
      }}
    >
      {pending && (
        <View className="p-2 animate-ping bg-blue absolute rounded-full top-2 right-2"></View>
      )}
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
