import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import { ScrollView } from "react-native-gesture-handler";
import InputComponent from "@/components/ui/InputComponent";
import Button from "@/components/ui/Button";
import AdminPage from "@/components/AdminPage";

const admin = () => {
  return (
    <View className="flex flex-1 bg-background p-2">
      <AdminPage />
    </View>
  );
};

export default admin;
