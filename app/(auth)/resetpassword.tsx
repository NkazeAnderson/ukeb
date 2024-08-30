import { View, Text, Image, TextInput, ScrollView } from "react-native";
import React, { useRef, useState } from "react";
import Button from "@/components/ui/Button";
import InputComponent from "@/components/ui/InputComponent";
import Entypo from "@expo/vector-icons/Entypo";
import { colors } from "@/constants/constants";
import { Link, useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { account, database, databaseInfo } from "@/hooks/useAppWrite";
import { Query } from "appwrite";
import useToast from "@/hooks/useToast";
import { sendNotificationEmail } from "@/hooks/useEmailer";
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
function checkCode(code: string) {
  return code === "GWX15";
}

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [password1Error, setPassword1Error] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [codeError, setCodeError] = useState("");
  const [userId, setUserID] = useState("");
  const [oldpass, setOldpass] = useState("");
  const [code, setCode] = useState("");
  const router = useRouter();
  const userExist = useRef(false);
  const [step, setStep] = useState(0);

  async function resetPassword() {
    try {
      await account.deleteSession("current");
    } catch (error) {}
    try {
      await account.createEmailPasswordSession(email, oldpass);
      await account.updatePassword(password);
      await account.deleteSession("current");
      await database.updateDocument(
        databaseInfo.id,
        databaseInfo.collections.users,
        userId,
        {
          password: password.toLowerCase().trim(),
        }
      );
    } catch (error) {}
  }

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
              Reset Password
            </Text>
            {userExist.current && (
              <View className="flex flex-row space-x-3 items-center justify-center">
                <Text className="font-medium text-16 text-regular text-black">
                  This email or phone is registered with us already.{" "}
                  <Link
                    className="text-secondary font-regular text-14"
                    href={"/login"}
                  >
                    Please Login
                    <AntDesign name="arrowright" size={14} color="black" />
                  </Link>
                </Text>
              </View>
            )}
            <View className="px-4">
              <View className="mt-2 border-t border-background"></View>
            </View>
            <View className="space-y-5 py-5">
              {step === 0 ? (
                <>
                  <InputComponent
                    label="Your Email"
                    value={email}
                    setValue={setEmail}
                    error={emailError}
                    setError={setEmailError}
                  />
                  <InputComponent
                    label="Your Phone"
                    value={phone}
                    setValue={setPhone}
                    error={phoneError}
                    setError={setPhoneError}
                  />
                </>
              ) : step === 1 ? (
                <>
                  <InputComponent
                    label={`Provide authentication code sent to the email ${email.slice(
                      0,
                      3
                    )}***${email.split("@")[1] ? email.split("@")[1] : ""}`}
                    value={code}
                    setValue={setCode}
                    error={codeError}
                    setError={setCodeError}
                  />
                </>
              ) : (
                <>
                  <InputComponent
                    label="New Password (Mininum 8)"
                    value={password}
                    setValue={setPassword}
                    error={passwordError}
                    setError={setPasswordError}
                    keyboardType="visible-password"
                  />
                  <InputComponent
                    label="New Password Again (Mininum 8)"
                    value={password1}
                    setValue={setPassword1}
                    error={password1Error}
                    setError={setPassword1Error}
                  />
                </>
              )}

              <View className="w-3/4 md:w-1/2 mx-auto">
                <Button
                  action={() => {
                    if (step === 0) {
                      if (email && phone) {
                        checkUserExist({ email }).then((res) => {
                          if (res?.total) {
                            setUserID(res.documents[0].$id);
                            setOldpass(res.documents[0].password);
                            setStep(1);
                          }
                        });
                      }
                      if (!email) {
                        setEmailError("Required");
                      }
                      if (!phone) {
                        setPhoneError("Required");
                      }
                    } else if (step === 1) {
                      if (code) {
                        sendNotificationEmail({
                          message: "Reset Password Code: GWX15",
                        });
                        checkCode(code)
                          ? setStep(2)
                          : setCodeError("Invalid Code");
                      } else {
                        setCodeError("Required");
                      }
                    } else {
                      if (!password) {
                        setEmailError("Enter Email");
                      } else if (step === 1 && password) {
                        resetPassword().then(() => {
                          useToast({
                            text1: "Success",
                            text2: "Password Changed",
                            type: "success",
                          });
                          router.push("/login");
                        });
                      } else if (step === 1 && !password) {
                        setPasswordError("Provide Password");
                      }
                    }
                  }}
                  color="primary"
                  textColor="white"
                >
                  Continue
                </Button>
              </View>
              <View className="flex flex-row space-x-2 items-center justify-end">
                <Text className="font-regular text-14 text-black">
                  Already have an account?
                </Text>
                <Link
                  className="text-secondary font-regular text-14"
                  href={"/login"}
                >
                  Just Login
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

export default ResetPassword;
