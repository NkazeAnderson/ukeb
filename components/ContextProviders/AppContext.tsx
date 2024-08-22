import { View, Text } from "react-native";
import React, { createContext, useEffect, useState } from "react";

function retrieveBankInfo(): bankInfoT {
  return {
    phone: process.env.EXPO_PUBLIC_Bank_Phone,
    email: process.env.EXPO_PUBLIC_Bank_Email ?? "",
    swiftCode: process.env.EXPO_PUBLIC_Bank_SwiftCode ?? "",
    whatsapp: process.env.EXPO_PUBLIC_Bank_Whatsapp,
    address: process.env.EXPO_PUBLIC_Bank_Address,
  };
}

export const AppContext = createContext<appContextT | undefined>(undefined);
const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<userT | undefined>(undefined);
  const [bankInfo, setBankInfo] = useState<bankInfoT>(retrieveBankInfo());
  const [navOpen, setNavOpen] = useState<boolean>(false);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        navOpen,
        setNavOpen,
        bankInfo,
        setBankInfo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
