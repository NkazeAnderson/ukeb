import { View, Text, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import AntDesign from "@expo/vector-icons/AntDesign";
import { baseAccountNumber, colors } from "@/constants/constants";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import Button from "../ui/Button";
import DashboardSideBar from "./DashboardSideBar";
import { usePathname, useRouter } from "expo-router";
import { AppContext } from "../ContextProviders/AppContext";
import * as Clipboard from "expo-clipboard";
import useToast from "@/hooks/useToast";
import { database, databaseInfo } from "@/hooks/useAppWrite";
import { Query } from "appwrite";

async function updateTransaction(
  transaction: transactionT,
  sender: userT,
  cancel?: boolean
) {
  const reciever = await database.getDocument(
    databaseInfo.id,
    databaseInfo.collections.users,
    transaction.reciever
  );

  await database.updateDocument(
    databaseInfo.id,
    databaseInfo.collections.users,
    transaction.reciever,
    {
      incomingBalance: reciever.incomingBalance - transaction.amount,
      incomingLimit: 1,
      balance: cancel
        ? reciever.balance
        : reciever.balance + transaction.amount,
    }
  );
  await database.updateDocument(
    databaseInfo.id,
    databaseInfo.collections.users,
    transaction.sender,
    {
      balance: cancel ? sender.balance + transaction.amount : sender.balance,
      outgoingBalance: sender.outgoingBalance
        ? sender.outgoingBalance - transaction.amount
        : 0,
    }
  );

  // create a transaction
  await database.updateDocument(
    databaseInfo.id,
    databaseInfo.collections.transactions,
    transaction.$id,
    {
      status: cancel ? "failed" : "completed",
    }
  );
}

const DashboardMain = () => {
  const { user, bankInfo, setRefereshUserInfo, refereshUserInfo } = useContext(
    AppContext
  ) as appContextT;
  const [transactions, setTransactions] = useState<transactionT[]>([]);
  const [transactionAction, setTransactionAction] = useState<
    "release" | "cancel" | undefined
  >(undefined);
  const [transactionActionTarget, setTransactionActionTarget] = useState<
    string | undefined
  >(undefined);
  const [pendingUpdateTransaction, setPendingUpdateTransaction] =
    useState(false);
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      return;
    }
    database
      .listDocuments(databaseInfo.id, databaseInfo.collections.transactions, [
        Query.or([
          Query.equal("sender", user.$id),
          Query.equal("reciever", user.$id),
        ]),
        Query.orderDesc("date"),
      ])
      .then((res) => {
        setTransactions([...(res.documents as [])]);
      });
  }, [refereshUserInfo]);
  const [viewMore, setViewMore] = useState(false);
  if (!user) {
    return null;
  }
  return (
    <ScrollView className="flex flex-1 bg-blue/20 p-2 md:px-3 lg:px-6 rounded-md ">
      <View className="flex flex-col lg:flex-row pb-12">
        <View className="w-full lg:w-2/3 space-y-2">
          <Text className="text-secondary font-medium text-24 md:text-32">
            Important Updates
          </Text>

          <View className="flex space-x-3 flex-row items-center border-2 border-info">
            <View className="bg-info p-2 ">
              <AntDesign name="infocirlceo" size={24} color={colors.white} />
            </View>
            <Text className="font-regular text-16 text-white">
              {user.alert}
            </Text>
          </View>
          <Text className="text-secondary text-center font-medium text-24 md:text-32">
            Accounts
          </Text>

          <View className="border-secondary  border-2">
            <View className="bg-secondary">
              <Text className="font-medium text-center text-16 text-white">
                Account Number
              </Text>
            </View>
            <View className="p-1">
              {viewMore ? (
                <View className="space-y-3">
                  <View className="flex flex-row items-center space-x-2">
                    <Text className=" font-medium text-18 text-white">No:</Text>
                    <Text className=" font-medium text-16 text-gray-text">
                      {baseAccountNumber + user.accountNumber}
                    </Text>
                  </View>
                  <View className="flex flex-row items-center space-x-2">
                    <Text className=" font-medium text-18 text-white">
                      Swift Code:
                    </Text>
                    <Text className=" font-medium text-16 text-gray-text">
                      {bankInfo.swiftCode}
                    </Text>
                  </View>
                  <View className="flex flex-row items-center space-x-2">
                    <Text className=" font-medium text-18 text-white">
                      City:
                    </Text>
                    <Text className=" font-medium text-16 text-gray-text">
                      London
                    </Text>
                  </View>
                  <View className="flex flex-row items-center space-x-2">
                    <Text className=" font-medium text-18 text-white">
                      Country:
                    </Text>
                    <Text className=" font-medium text-16 text-gray-text">
                      United Kingdom
                    </Text>
                  </View>
                </View>
              ) : (
                <Text className="font-regular text-center text-16 text-white">
                  {baseAccountNumber + user.accountNumber}
                </Text>
              )}
            </View>
            <Pressable
              className="bg-secondary py-2 border border-gray-text flex flex-row items-center justify-between px-5"
              onPress={() => {
                setViewMore((prev) => !prev);
              }}
            >
              <Text className="font-medium text-center text-16 text-white">
                {viewMore ? "Show Less" : "View More"}
              </Text>
              <Entypo name="chevron-down" size={16} color={colors.white} />
            </Pressable>
            <Pressable
              className="bg-secondary flex flex-row items-center justify-between px-5 py-2"
              onPress={async () => {
                await Clipboard.setStringAsync(
                  `Account Number: ${
                    baseAccountNumber + user.accountNumber
                  }, SwiftCode: ${
                    bankInfo.swiftCode
                  }, City: London, Country: United Kingdom`
                ).then(() => {
                  useToast({
                    text1: "Copied",
                    text2: "Successfully copied details",
                    type: "success",
                  });
                });
              }}
            >
              <Text className="font-medium text-center text-16 text-white">
                Share
              </Text>
              <Entypo name="share" size={16} color={colors.white} />
            </Pressable>
          </View>
          <View>
            <Text className="text-gray-text text-center font-medium text-24 md:text-32">
              Balance
            </Text>
            <Text className="text-white text-center font-bold text-32 md:text-48 ">
              £ {user.balance?.toLocaleString()}
            </Text>
            <Text className="text-gray-text text-center font-bold text-14 md:text-16 ">
              Available
            </Text>
          </View>
          <View className="flex flex-row justify-between">
            <View className="flex w-1/2 flex-row  items-center">
              <View className="bg-success p-2 rounded-full ">
                <Feather name="arrow-up-right" size={24} color={colors.white} />
              </View>
              <View className="p-2">
                <Text className="font-regular text-16 text-white">
                  Incoming
                </Text>
                <Text className="font-regular text-14 text-white">
                  £ {user.incomingBalance?.toLocaleString() ?? 0}
                </Text>
              </View>
            </View>
            <View className="flex w-1/2  flex-row items-center justify-end ">
              <View className="p-2">
                <Text className="font-regular text-16 text-white">
                  Outgoing
                </Text>
                <Text className="font-regular text-14 text-white">
                  £ {user.outgoingBalance?.toLocaleString() ?? 0}
                </Text>
              </View>
              <View className="bg-danger p-2 rounded-full ">
                <Feather
                  name="arrow-down-right"
                  size={24}
                  color={colors.white}
                />
              </View>
            </View>
          </View>
          <View className="px-[25%] ">
            <Button
              color="primary"
              textColor="white"
              action={() => {
                router.push("/dashboard/send");
              }}
            >
              Send Money
            </Button>
          </View>
          <Text className="text-secondary font-medium text-24 md:text-32">
            Transactions
          </Text>
          {transactions.length === 0 && (
            <View className="flex space-x-3 bg-info/20 rounded flex-row items-start border-2 border-info">
              <View className="bg-info p-2 h-full ">
                <AntDesign name="infocirlceo" size={24} color={colors.white} />
              </View>
              <View className="flex-grow">
                <Text className="font-medium text-18 text-white">
                  No Transaction
                </Text>
                <Text className="font-regular text-16 text-white">
                  No Transaction recorded for this account
                </Text>
                <View className="flex flex-row justify-end items-center ">
                  <Text className="text-end text-gray-text">12/07/2024</Text>
                </View>
              </View>
            </View>
          )}
          {transactions.length > 0 &&
            transactions.map((transaction, index) => (
              <View
                key={index}
                className={`flex space-x-3  rounded flex-row items-start border-2 border-info ${
                  transaction.status === "failed"
                    ? "border-danger bg-danger/20"
                    : transaction.status === "pending"
                    ? "border-info bg-info/20"
                    : "border-success bg-success/20"
                }`}
              >
                <View
                  className={`${
                    transaction.status === "failed"
                      ? "bg-danger"
                      : transaction.status === "pending"
                      ? "bg-info"
                      : "bg-success"
                  } p-2 h-full `}
                >
                  <AntDesign
                    name={
                      transaction.status === "failed"
                        ? "closecircleo"
                        : transaction.status === "completed"
                        ? "checkcircle"
                        : "infocirlceo"
                    }
                    size={24}
                    color={colors.white}
                  />
                </View>
                <View className="flex-grow px-1">
                  {(transactionAction === "cancel" ||
                    transactionAction === "release") &&
                  transactionActionTarget === transaction.$id ? (
                    <View>
                      <Text
                        className={`font-bold capitalize ${
                          transactionAction === "release"
                            ? "text-primary "
                            : " text-danger"
                        }  text-18`}
                      >
                        {`Sure you want to ${transactionAction}?`}
                      </Text>
                      <View className="flex flex-row items-center justify-center">
                        <View className="w-3/4 space-y-2 py-5">
                          <Button
                            color={
                              transactionAction === "release"
                                ? "secondary"
                                : "danger"
                            }
                            textColor="white"
                            pending={pendingUpdateTransaction}
                            action={() => {
                              setPendingUpdateTransaction(true);
                              updateTransaction(
                                transaction,
                                user,
                                transactionAction === "cancel"
                              )
                                .then(() => {
                                  setRefereshUserInfo((prev) => !prev);
                                  setTransactionAction(undefined);
                                  setTransactionActionTarget(undefined);
                                  useToast({
                                    text1: "Updated!",
                                    text2:
                                      "Successfully updated this transaction",
                                    type: "success",
                                  });
                                })
                                .catch((e) => {
                                  console.log(e);
                                  useToast({
                                    text1: "Updating...",
                                    text2: "Reaching your bank",
                                    type: "success",
                                  });
                                })
                                .finally(() => {
                                  setPendingUpdateTransaction(false);
                                });
                            }}
                          >
                            Yes
                          </Button>
                          <View className=" px-6 lg:px-12">
                            <Button
                              color="secondary"
                              textColor="secondary"
                              outlined
                              action={() => {
                                setTransactionAction(undefined);
                                setTransactionActionTarget(undefined);
                              }}
                            >
                              No
                            </Button>
                          </View>
                        </View>
                      </View>
                    </View>
                  ) : (
                    <>
                      <Text className="font-medium text-18 text-white">
                        {transaction.sender === user.$id &&
                        transaction.status === "completed"
                          ? "Sent Money"
                          : transaction.sender === user.$id &&
                            transaction.status === "pending"
                          ? "Transfer in Progress"
                          : transaction.sender === user.$id &&
                            transaction.status === "failed"
                          ? "Transfer Unsuccesfull"
                          : transaction.reciever === user.$id &&
                            transaction.status === "completed"
                          ? "Received Money"
                          : transaction.reciever === user.$id &&
                            transaction.status === "pending"
                          ? "Incoming Funds"
                          : "Transfer Reverted"}
                      </Text>
                      <Text className="font-regular text-ellipsis text-16 text-white">
                        {`${transaction.status} transaction`}
                      </Text>
                      <Text className="font-regular text-ellipsis text-16 text-white">
                        {`£ ${transaction.amount.toLocaleString()}`}
                      </Text>
                      <Text className="font-regular text-16 text-white">
                        Purpose: {transaction.purpose}
                      </Text>
                      <View className="flex flex-row justify-end items-center ">
                        <Text className="text-end text-gray-text">{`${
                          transaction.date.split("T")[0]
                        }`}</Text>
                      </View>
                    </>
                  )}

                  {transaction.status === "pending" &&
                    transaction.sender === user.$id && (
                      <View className=" flex flex-row py-2 ">
                        <View className=" w-1/2 px-1">
                          <Button
                            color="secondary"
                            textColor="white"
                            action={() => {
                              setTransactionAction("release");
                              setTransactionActionTarget(transaction.$id);
                            }}
                          >
                            Release
                          </Button>
                        </View>
                        <View className=" w-1/2 px-1">
                          <Button
                            color="danger"
                            textColor="white"
                            action={() => {
                              setTransactionAction("cancel");
                              setTransactionActionTarget(transaction.$id);
                            }}
                          >
                            Cancel
                          </Button>
                        </View>
                      </View>
                    )}
                </View>
              </View>
            ))}
        </View>
        <View className="lg:w-1/3 p-4">
          <DashboardSideBar />
        </View>
      </View>
    </ScrollView>
  );
};

export default DashboardMain;
