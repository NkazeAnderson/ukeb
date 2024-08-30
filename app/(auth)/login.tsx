import { View, Text, Image, TextInput, ScrollView } from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import Button from "@/components/ui/Button";
import InputComponent from "@/components/ui/InputComponent";
import Entypo from "@expo/vector-icons/Entypo";
import { colors } from "@/constants/constants";
import { Link, router } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { AppContext } from "@/components/ContextProviders/AppContext";
import { account, database, databaseInfo } from "@/hooks/useAppWrite";
import { Models, Query } from "appwrite";
import Toast from "react-native-toast-message";
import useToast from "@/hooks/useToast";

async function checkUserExist(input: { email: string }) {
  try {
    console.log("Chcecking if user exist");

    const res = await database.listDocuments(
      databaseInfo.id,
      databaseInfo.collections.users,
      [Query.equal("email", input.email)]
    );

    return res;
  } catch (error) {
    console.log(error);
  }
}

async function logIn({ email, password }: { email: string; password: string }) {
  const res = await checkUserExist({ email });
  console.log("got userwit email");
  console.log(res);

  if (res?.total) {
    const pseudo = res.documents[0].pseudoEmail;
    const emailDb = res.documents[0].email as string;
    try {
      await account.createEmailPasswordSession(
        pseudo ? pseudo : emailDb,
        password
      );
    } catch (error) {
      console.log(error);

      if (error instanceof Error) {
        if (
          error.message !==
          "Creation of a session is prohibited when a session is active."
        ) {
          throw new Error("Unknown error occured");
        }
      }
    }

    return res.documents[0] as unknown extends userT ? userT : never;
  } else {
    throw new Error("User not exist");
  }
}
const Login = () => {
  const { user, setUser } = useContext(AppContext) as appContextT;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [step, setStep] = useState(0);
  const [pending, setPending] = useState(false);
  const [ios, setIos] = useState("");
  useEffect(() => {
    !user
      ? account
          .get()
          .then(async (res) => {
            const userData: Models.DocumentList<Models.Document> =
              res.email.split("@")[1] === "ukmb.com"
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

            console.log(userData);

            if (userData.total) {
              //@ts-expect-error uset
              setUser(userData.documents[0] as userT);
            }
          })
          .catch((e) => {
            console.log(e);
          })
      : router.push("/dashboard");
  }, [user]);

  function reset() {
    setPassword("");
    setEmail("");
    setEmailError("");
    setPasswordError("");
    setStep(0);
  }
  return (
    <View className="flex flex-1 bg-background">
      <ScrollView className="flex flex-1 mt-10">
        <View className="flex flex-1 flex-col items-center justify-center px-2 md:px-3 lg:px-6 bg-background">
          <View className="w-full md:w-4/5 lg:w-1/2 p-4 bg-gray-text border border-gray rounded-xl">
            <View className="flex flex-row justify-center w-full">
              <View className="relative ">
                <Image
                  className="flex-1 aspect-video"
                  resizeMode="contain"
                  source={require("@/assets/images/ukeb-logo.png")}
                />
              </View>
            </View>
            <Text className=" font-bold text-18 md:text-32 text-background text-center">
              UK Metropolitan Bank
            </Text>
            <Text className=" font-bold text-32 md:text-48 text-background text-center">
              Login
            </Text>
            {email && step === 1 && (
              <View className="flex flex-row space-x-3 items-center justify-center">
                <Text className="font-medium text-16 text-regular underline text-black">
                  {email}
                </Text>
                <Entypo
                  name="circle-with-cross"
                  size={16}
                  color={colors.danger}
                  onPress={reset}
                />
              </View>
            )}
            <View className="px-4">
              <View className="mt-2 border-t border-background"></View>
            </View>
            <View className="space-y-5 py-5">
              {step === 0 ? (
                <InputComponent
                  label="Enter your Email or 12-digit customer number"
                  value={email}
                  error={emailError}
                  setValue={setEmail}
                  setError={setEmailError}
                />
              ) : (
                <InputComponent
                  label={"Your Password"}
                  value={password}
                  error={passwordError}
                  setValue={setPassword}
                  setError={setPasswordError}
                />
              )}
              {ios && <Text>{ios}</Text>}

              <View className="w-3/4 md:w-1/2 mx-auto">
                <Button
                  action={() => {
                    setPending(true);
                    if (step === 0 && email) {
                      setStep(1);
                      setPending(false);
                    } else if (step === 0 && !email) {
                      setEmailError("Enter Email");
                      setPending(false);
                    } else if (step === 1 && password) {
                      logIn({
                        email: email.toLowerCase().trim(),
                        password: password.toLowerCase().trim(),
                      })
                        .then((user) => {
                          useToast({
                            type: "success",
                            text1: "Welcome",
                            text2: "You have successfully logged in",
                          });
                          setUser(user);
                          setPending(false);
                          setTimeout(() => {
                            router.push("/dashboard");
                          }, 100);
                        })
                        .catch((e) => {
                          console.log(e);
                          if (e instanceof Error) {
                            //setIos(e.message);
                            if (e.message === "User not exist") {
                              useToast({
                                type: "error",
                                text1: "Error logging in",
                                text2: "Wrong credentials.",
                              });
                            } else {
                              useToast({
                                type: "error",
                                text1: "Error logging in",
                                text2: "Connectivity or invalid credentials",
                              });
                            }
                          }
                          setPending(false);
                        });
                    }
                  }}
                  color="primary"
                  textColor="white"
                  pending={pending}
                >
                  Continue
                </Button>
              </View>
              <View className="flex flex-row space-x-2 items-center justify-end">
                <Text className="font-regular text-14 text-black">
                  Forgot your password?
                </Text>
                <Link
                  className="text-black font-regular text-14"
                  href={"/resetpassword"}
                >
                  Reset Password
                  <AntDesign name="arrowright" size={14} color="black" />
                </Link>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;
