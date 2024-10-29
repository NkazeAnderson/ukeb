import React, { createContext, useEffect, useState } from "react";
import { router, usePathname } from "expo-router";
import { account, database, databaseInfo } from "@/hooks/useAppWrite";
import { Models, Query } from "appwrite";

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
  const [refereshUserInfo, setRefereshUserInfo] = useState<boolean>(false);
  const path = usePathname();
  useEffect(() => {
    // account.deleteSession("current");
    if (user) {
      if (path === "/login") {
        router.push("/dashboard");
      }
    } else {
      (path === "/dashboard" || path === "/login" ) && account
        .get()
        .then(async (res) => {
          console.log(res);

          const userData: Models.DocumentList<Models.Document> =
            res.email.split("@")[1].trim() === "ukmb.com" ||
            res.email.split("@")[1].trim() === "banking.com"
              ? await database.listDocuments(
                  databaseInfo.id, // databaseId
                  databaseInfo.collections.users, // collectionId
                  [Query.equal("pseudoEmail", res.email)] // queries (optional)
                )
              : await database.listDocuments(
                  databaseInfo.id, // databaseId
                  databaseInfo.collections.users, // collectionId
                  [Query.equal("email", res.email)] // queries (optional)
                );

          if (userData.total) {
            //@ts-expect-error uset
            setUser(userData.documents[0] as userT);
          } else {
            console.log(res.email.split("@")[1] === "ukmb.com");

            throw new Error("User count less than 1");
          }
        })
        .catch((e) => {
          console.log(e);
          path === "/dashboard" && router.replace("/login");
        });
    }
  }, [user, path]);
  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        navOpen,
        setNavOpen,
        bankInfo,
        setBankInfo,
        refereshUserInfo,
        setRefereshUserInfo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
