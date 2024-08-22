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

function getAccount(accountNumber: string) {
  console.log(accountNumber.split(baseAccountNumber)[0]);

  return accountNumber.split(baseAccountNumber)[0];
}

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
      throw new Error("user not exist");
    }
  } else {
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

const send = () => {
  const { user, setUser } = useContext(AppContext) as appContextT;
  const [width, setWidth] = useState(0);
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [purpose, setPurpose] = useState("");
  const [swiftCode, setSwiftCode] = useState("");
  const [escrow, setEscrow] = useState(false);
  const [pending, setPending] = useState(false);

  return (
    <View className="flex flex-1 bg-background relative">
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
          resizeMode="stretch"
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
                action={() => {
                  setPending(true);
                  user &&
                    submit({
                      sender: user,
                      accountNumber,
                      amount,
                      purpose,
                      escrow,
                    })
                      .then(() => {
                        useToast({
                          text1: "Sent",
                          text2: "You sent money to " + accountNumber,
                          type: "success",
                        });
                        router.push("/dashboard");
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
    </View>
  );
};

export default send;
