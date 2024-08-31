import { View, Text, Image, Pressable } from "react-native";
import React, { useContext, useState } from "react";
import InputComponent from "@/components/ui/InputComponent";
import Button from "@/components/ui/Button";
import { AppContext } from "@/components/ContextProviders/AppContext";
import { baseAccountNumber, colors } from "@/constants/constants";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { database, databaseInfo } from "@/hooks/useAppWrite";
import { ID, Query } from "appwrite";
import { router } from "expo-router";
import useToast from "@/hooks/useToast";
import { sendNotificationEmail } from "@/hooks/useEmailer";
import { ScrollView } from "react-native-gesture-handler";

async function submit({
  accountNumber,
  amount,
  purpose,
  escrow,
  sender,
}: {
  accountNumber: string;
  amount: string;
  purpose: string;
  sender: userT;
  escrow: boolean;
}) {
  const amountInt = parseInt(amount);
  const acctNum = accountNumber.split(baseAccountNumber)[1];

  if (sender.balance < amountInt) {
    throw new Error("low balance");
  }
  if (accountNumber.includes(baseAccountNumber)) {
    // user is a member of this bank
    const recieverInfo = await database.listDocuments(
      databaseInfo.id,
      databaseInfo.collections.users,
      [Query.equal("accountNumber", parseInt(acctNum))]
    );
    const reciever = recieverInfo.documents[0];

    if (acctNum == String(sender.accountNumber)) {
      throw new Error("same user");
    }

    if (recieverInfo.total === 1) {
      // found user
      if (escrow) {
        await database.updateDocument(
          databaseInfo.id,
          databaseInfo.collections.users,
          reciever.$id,
          {
            incomingBalance: reciever.incomingBalance + amountInt,
            incomingLimit: 100,
          }
        );
        await database.updateDocument(
          databaseInfo.id,
          databaseInfo.collections.users,
          sender.$id,
          {
            balance: sender.balance - amountInt,
            outgoingBalance: sender.outgoingBalance
              ? sender.outgoingBalance + amountInt
              : amountInt,
          }
        );
      } else {
        await database.updateDocument(
          databaseInfo.id,
          databaseInfo.collections.users,
          reciever.$id,
          {
            balance: reciever.balance + amountInt,
          }
        );
        await database.updateDocument(
          databaseInfo.id,
          databaseInfo.collections.users,
          sender.$id,
          {
            balance: sender.balance - amountInt,
          }
        );
      }
      // create a transaction
      await database.createDocument(
        databaseInfo.id,
        databaseInfo.collections.transactions,
        ID.unique(),
        {
          sender: sender.$id,
          reciever: reciever.$id,
          amount: amountInt,
          status: escrow ? "pending" : "completed",
          purpose,
          date: new Date(),
        }
      );
    } else {
      //Can't find exact user
      throw new Error("user not exist");
    }
  } else {
    //To different bank
    await database.updateDocument(
      databaseInfo.id,
      databaseInfo.collections.users,
      sender.$id,
      {
        outgoingBalance: sender.outgoingBalance
          ? sender.outgoingBalance + amountInt
          : amountInt,
        balance: sender.balance - amountInt,
      }
    );

    await database.createDocument(
      databaseInfo.id,
      databaseInfo.collections.transactions,
      ID.unique(),
      {
        sender: sender.$id,
        reciever: accountNumber,
        amount: amountInt,
        status: "pending",
        purpose,
        date: new Date(),
      }
    );
  }
}
async function getRates(rate: "usd" | "eur" | "cad" | "pounds") {
  const gbpusd =
    "https://twelve-data1.p.rapidapi.com/exchange_rate?symbol=GBP%2FUSD";
  const gbpeur =
    "https://twelve-data1.p.rapidapi.com/exchange_rate?symbol=GBP%2FEUR";
  const gbpcad =
    "https://twelve-data1.p.rapidapi.com/exchange_rate?symbol=GBP%2FCAD";

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": process.env.EXPO_PUBLIC_Rapid_Api_Key as string,
      "x-rapidapi-host": "twelve-data1.p.rapidapi.com",
    },
  };
  console.log("Getting rates");
  try {
    const res = await fetch(
      rate === "usd" ? gbpusd : rate === "eur" ? gbpeur : gbpcad,
      options
    );
    const obj = await res.json();
    return obj.rate;
  } catch (error) {
    console.error(error);
  }
}
const send = () => {
  const { user, setRefereshUserInfo } = useContext(AppContext) as appContextT;
  const [width, setWidth] = useState(0);
  const [currency, setCurrency] = useState<"usd" | "eur" | "cad" | "pounds">(
    "pounds"
  );
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [purpose, setPurpose] = useState("");
  const [swiftCode, setSwiftCode] = useState("");
  const [escrow, setEscrow] = useState(false);
  const [pending, setPending] = useState(false);

  return (
    <ScrollView className="flex flex-1 bg-background relative">
      <View
        className="absolute w-full h-full"
        onLayout={(e) => {
          const w = e.nativeEvent.layout.width;
          setWidth(w);
        }}
      >
        <Image
          style={{ width: width }}
          className="h-full"
          resizeMode="cover"
          source={require("@/assets/images/send-bg.png")}
        />
      </View>
      <View>
        <Text className="font-bold text-24 md:text-32 text-secondary text-center">
          Send Money
        </Text>
        <View className="p-5 ">
          <View className="border-2 border-secondary rounded-lg p-2">
            <Text className="text-24 font-medium text-white">
              Where do you want to send money to?
            </Text>
            <View className="md:w-3/4">
              <InputComponent
                value={accountNumber}
                setValue={setAccountNumber}
                label="Account Number"
                whiteBg
              />
              <InputComponent
                value={swiftCode}
                setValue={setSwiftCode}
                label="Swift Code"
                whiteBg
              />
              {user?.isAdmin && (
                <View className="py-3">
                  <Text className="text-white font-medium text-18">
                    Select Your Currency
                  </Text>

                  <View className="flex flex-row">
                    <Pressable
                      onPress={() => {
                        setCurrency("pounds");
                      }}
                      className={`bg-primary w-1/3 border-success rounded-l-full p-2 ${
                        currency === "pounds" && "border-2"
                      }`}
                    >
                      <Text
                        className={`text-center ${
                          currency === "pounds" ? "text-success" : "text-white"
                        } font-regular`}
                      >
                        Pounds
                      </Text>
                    </Pressable>
                    <Pressable
                      onPress={() => {
                        setCurrency("eur");
                      }}
                      className={`bg-primary w-1/3 border-success p-2 ${
                        currency === "eur" && "border-2"
                      }`}
                    >
                      <Text
                        className={`text-center ${
                          currency === "eur" ? "text-success" : "text-white"
                        } font-regular`}
                      >
                        Euro
                      </Text>
                    </Pressable>
                    <Pressable
                      onPress={() => {
                        setCurrency("usd");
                      }}
                      className={`bg-primary w-1/3 border-success rounded-r-full p-2 ${
                        currency === "usd" && "border-2"
                      }`}
                    >
                      <Text
                        className={`text-center ${
                          currency === "usd" ? "text-success" : "text-white"
                        } font-regular`}
                      >
                        USD
                      </Text>
                    </Pressable>
                  </View>
                </View>
              )}

              <InputComponent
                value={amount}
                setValue={setAmount}
                label="Amount"
                whiteBg
              />
              <InputComponent
                value={purpose}
                setValue={setPurpose}
                label="Purpose"
                whiteBg
              />
              <Pressable
                onPress={() => {
                  setEscrow((prev) => !prev);
                }}
              >
                <Text className="text-16 font-regular text-primary">
                  For Business? <Text className="text-[10px] ">Escrow</Text>
                </Text>
                <View className="flex flex-row space-x-3">
                  <View
                    className={`flex flex-row ${
                      escrow && "justify-end"
                    } w-[100px] h-[40px] p-1 border-2 border-secondary rounded-full`}
                  >
                    <View className="w-1/2 h-full bg-secondary rounded-full"></View>
                  </View>
                  <View>
                    {escrow ? (
                      <FontAwesome
                        name="lock"
                        size={16}
                        color={colors.danger}
                      />
                    ) : (
                      <AntDesign
                        name="unlock"
                        size={16}
                        color={colors.success}
                      />
                    )}
                  </View>
                </View>
              </Pressable>
            </View>
            <View className="px-[25%] md:px-[35%] mt-5">
              <Button
                action={async () => {
                  setPending(true);
                  let rate: number = 1;
                  if (currency !== "pounds") {
                    const exchangeRate = await getRates(currency);
                    rate = exchangeRate;
                  }

                  user &&
                    submit({
                      sender: user,
                      accountNumber,
                      amount: String(parseInt(amount) / rate),
                      purpose,
                      escrow,
                    })
                      .then(() => {
                        useToast({
                          text1: "Sent",
                          text2: "You sent money to " + accountNumber,
                          type: "success",
                          onHide: () => {
                            router.push("/dashboard");
                          },
                        });
                        setRefereshUserInfo((prev) => !prev);

                        sendNotificationEmail({
                          message: `${user.firstName} ${user.lastName} sent ${amount} ${currency}  to ${accountNumber}`,
                        });
                      })
                      .catch((e) => {
                        if (!(e instanceof Error)) {
                          return;
                        }
                        if (e.message === "same user") {
                          useToast({
                            text1: "Error",
                            text2: "Can't send to own self",
                            type: "failed",
                          });
                        } else if (e.message === "low balance") {
                          useToast({
                            text1: "Error",
                            text2: "Insufficient funds",
                            type: "failed",
                          });
                        } else if (e.message === "user not exist") {
                          useToast({
                            text1: "Error",
                            text2: "User does not exist",
                            type: "failed",
                          });
                        }
                      })
                      .finally(() => {
                        setPending(false);
                      });
                }}
                pending={pending}
                color="primary"
                textColor="white"
              >
                Send
              </Button>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default send;
