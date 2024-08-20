import { View, Text } from "react-native";
import React from "react";

const DashboardHeadings = ({
  children,
  centered,
}: {
  children: React.ReactNode;
  centered?: boolean;
}) => {
  return (
    <Text
      className={`text-secondary font-medium text-24 md:text-32 ${
        centered && "text-center"
      }`}
    >
      {children}
    </Text>
  );
};

export default DashboardHeadings;
