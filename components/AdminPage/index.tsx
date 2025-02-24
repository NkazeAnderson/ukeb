import { View, Text, Pressable, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import SectionHeading from "../ui/SectionHeading";
import InputComponent from "../ui/InputComponent";
import Button from "../ui/Button";
import { database, databaseInfo } from "@/hooks/useAppWrite";
import { ID, Query } from "appwrite";
import { baseAccountNumber } from "@/constants/constants";
import useToast from "@/hooks/useToast";
async function getUser(name: string) {
  const users = await database.listDocuments(
    databaseInfo.id,
    databaseInfo.collections.users,
    [
      Query.or([
        Query.contains("firstName", name),
        Query.contains("lastName", name),
      ]),
    ]
  );

  return users;
}
const AdminPage = () => {
  const [clientInfo, setClientInfo] = useState<
    Record<string, string | boolean | number>[]
  >([]);
  const [selectedUser, setSelectedUser] = useState(0);
  const [update, setUpdate] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [pending, setPending] = useState(false);
  const [name, setName] = useState("");
  const [alert, setAlert] = useState("");
  const [cc, setCc] = useState("");
  const [cvc, setCvc] = useState("");
  const [exp, setExp] = useState("");
  const [cardBalance, setCardBalance] = useState("");
  const [balance, setBalance] = useState("");
  const [inBalance, setInBalance] = useState("");
  const [outBalance, setOutBalance] = useState("");
  const [inLimit, setInLimit] = useState("");
  const [outLimit, setOutlimit] = useState("");
  const [cardPaymentAmount, setCardPaymentAmount] = useState("");
  const [cardPaymentDate, setCardPaymentDate] = useState("");
  const [cardPaymentSuccess, setCardPaymentSuccess] = useState(true);
  const [cardPaymentCompany, setCardPaymentCompany] = useState("");

  useEffect(() => {
    if (clientInfo[selectedUser]) {
      setAlert(String(clientInfo[selectedUser]?.alert ?? ""));
      setCc(String(clientInfo[selectedUser]?.cardNumber ?? ""));

      setCvc(String(clientInfo[selectedUser]?.cardCVV ?? ""));

      setExp(String(clientInfo[selectedUser]?.cardExpMonthYear ?? ""));

      setCardBalance(String(clientInfo[selectedUser]?.cardBalance ?? ""));

      setInLimit(String(clientInfo[selectedUser]?.incomingLimit ?? ""));

      setOutlimit(String(clientInfo[selectedUser]?.outgoingLimit ?? ""));
      setBalance(String(clientInfo[selectedUser]?.balance ?? ""));
      setInBalance(String(clientInfo[selectedUser]?.incomingBalance ?? ""));
      setOutBalance(String(clientInfo[selectedUser]?.outgoingBalance ?? ""));
    }
  }, [update]);
  useEffect(() => {
    name &&
      getUser(name).then((res) => {
        if (res.total) setClientInfo(res.documents);
        setUpdate(false);
      });
  }, [refresh]);
  return (
    <ScrollView className="flex  flex-1 px-2 md:px-6">
      <SectionHeading>Admin</SectionHeading>
      <View>
        <Text className="text-18 font-bold text-white">Search User</Text>
      </View>
      <View className="w-full md:w-1/2">
        <InputComponent
          label="First Name or Last Name"
          value={name}
          setValue={setName}
          whiteBg
        ></InputComponent>
        <View className="py-4"></View>
        <Button
          color="primary"
          textColor="white"
          pending={pending}
          action={() => {
            setPending(true);
            getUser(name)
              .then((res) => {
                if (res.total) setClientInfo(res.documents);
                if (!res.total)
                  useToast({
                    text1: "Not found",
                    text2: "Can't find this user",
                    type: "error",
                  });
              })
              .catch(() => {
                useToast({
                  text1: "Poor network",
                  text2: "Can't find this user",
                  type: "error",
                });
              })
              .finally(() => {
                setPending(false);
              });
          }}
        >
          Search
        </Button>
      </View>
      <View className="flex flex-row py-5 items-center space-x-2">
        {clientInfo.length && update && (
          <>
            <Text className=" font-regular text-18 text-primary">{`${baseAccountNumber}${clientInfo[selectedUser].accountNumber} is selected`}</Text>
            <Pressable
              onPress={() => {
                setUpdate(false);
              }}
            >
              <Text className=" font-bold text-danger text-32">X</Text>
            </Pressable>
          </>
        )}
      </View>
      <View>
        {update ? (
          <View className="w-full md:w-1/2">
            <InputComponent
              label="Alert"
              whiteBg
              value={alert}
              setValue={setAlert}
            />
            <InputComponent
              label="Card Number"
              whiteBg
              value={cc}
              setValue={setCc}
            />
            <InputComponent
              label="Card Expiration MM/YY"
              whiteBg
              value={exp}
              setValue={setExp}
            />
            <InputComponent
              label="Card CVV"
              whiteBg
              value={cvc}
              setValue={setCvc}
            />
            <InputComponent
              label="Balance"
              whiteBg
              value={balance}
              setValue={setBalance}
            />
            <InputComponent
              label="Incoming balance"
              whiteBg
              value={inBalance}
              setValue={setInBalance}
            />
            <InputComponent
              label="Outgoing Balance"
              whiteBg
              value={outBalance}
              setValue={setOutBalance}
            />

            <InputComponent
              label="Incoming Limit"
              whiteBg
              value={inLimit}
              setValue={setInLimit}
            />
            <InputComponent
              label="Outgoing Limit"
              whiteBg
              value={outLimit}
              setValue={setOutlimit}
            />
            <Button
              color="primary"
              textColor="white"
              pending={pending}
              action={async () => {
                setPending(true);
                try {
                  await database.updateDocument(
                    databaseInfo.id,
                    databaseInfo.collections.users,
                    String(clientInfo[selectedUser].$id),
                    {
                      alert,
                      cardNumber: cc,
                      cardExpMonthYear: exp,
                      cardCVV: cvc,
                      cardBalance: Number(cardBalance),
                      incomingLimit: Number(inLimit),
                      outgoingLimit: Number(outLimit),
                      balance: Number(balance),
                      incomingBalance: Number(inBalance),
                      outgoingBalance: Number(outBalance),
                    }
                  );
                  useToast({
                    text1: "Updated",
                    text2: "User Updated",
                    type: "success",
                  });
                  setRefresh((prev) => !prev);
                } catch (error) {
                  useToast({
                    text1: "Error",
                    text2: "User not Updated",
                    type: "error",
                  });
                }
                setPending(false);
              }}
            >
              Submit
            </Button>

            <View>
              <Text className=" py-10 text-white text-32 font-semibold">
                Add user card history
              </Text>
              <InputComponent
                label="Company"
                whiteBg
                value={cardPaymentCompany}
                setValue={setCardPaymentCompany}
              />
              <InputComponent
                label="Amount"
                whiteBg
                value={cardPaymentAmount}
                setValue={setCardPaymentAmount}
              />

              <InputComponent
                label="Date"
                whiteBg
                value={cardPaymentDate}
                setValue={setCardPaymentDate}
              />

              <Pressable
                className="flex flex-row space-x-2 py-4 items-center"
                onPress={() => {
                  setCardPaymentSuccess(!cardPaymentSuccess);
                }}
              >
                <View
                  className={` w-4 h-4 border ${
                    cardPaymentSuccess && "bg-success"
                  }`}
                ></View>
                <Text className=" text-primary font-semibold text-20">
                  Successful payment?
                </Text>
              </Pressable>

              <Button
                color="primary"
                textColor="white"
                pending={pending}
                action={async () => {
                  setPending(true);
                  const data: Omit<cardTransactionT, "$id"> = {
                    userId: String(clientInfo[selectedUser].$id),
                    amount: Number(cardPaymentAmount),
                    company: cardPaymentCompany,
                    date: cardPaymentDate,
                    successful: cardPaymentSuccess,
                  };
                  try {
                    await database.createDocument(
                      databaseInfo.id,
                      databaseInfo.collections.cardTransactions,
                      ID.unique(),
                      data
                    );
                    useToast({
                      text1: "Added",
                      text2: "Card History Added",
                      type: "success",
                    });
                    setRefresh((prev) => !prev);
                  } catch (error) {
                    useToast({
                      text1: "Error",
                      text2: "User not Updated",
                      type: "error",
                    });
                  }
                  setPending(false);
                }}
              >
                Add Card Payment Record
              </Button>
            </View>
          </View>
        ) : (
          <View className="w-full md:w-1/2">
            {clientInfo.map((user, index) => (
              <View key={index} className="border-y-2 border-success my-2 py-2">
                <View className="flex flex-row items-center justify-between my-1">
                  <View className="p-2 bg-white w-[60px] h-[60px] rounded-full">
                    {selectedUser === index && (
                      <View className="bg-success w-full h-full rounded-full"></View>
                    )}
                  </View>
                  <View className="w-1/2"></View>
                  <Button
                    color="primary"
                    textColor="white"
                    action={() => {
                      setSelectedUser(index);
                      setUpdate(true);
                    }}
                  >
                    Update
                  </Button>
                </View>
                {Object.keys(user).map((key, index) => (
                  <View key={index} className="">
                    <View className="p-2 bg-secondary">
                      <Text className="text-white text-center font-medium">
                        {key}
                      </Text>
                    </View>
                    <View className="py-3">
                      {key === "identification" || key === "profilePic" ? (
                        <Image
                          style={{ width: "100%", height: 400 }}
                          source={{ uri: String(user[key]) }}
                        />
                      ) : (
                        <Text className="text-white text-center font-regular">
                          {String(user[key])}
                        </Text>
                      )}
                    </View>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default AdminPage;
