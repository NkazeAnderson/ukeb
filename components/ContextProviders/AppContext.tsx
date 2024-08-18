import { View, Text } from "react-native";
import React, { createContext, useState } from "react";
export const AppContext = createContext<appContextT | undefined>(undefined);
const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<userT | undefined>(undefined);
  const [navOpen, setNavOpen] = useState<boolean>(false);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        navOpen,
        setNavOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
