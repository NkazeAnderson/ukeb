import { View, Text, Image, TextInput, ScrollView } from "react-native";
import React, { useContext, useState } from "react";
import Button from "@/components/ui/Button";
import InputComponent from "@/components/ui/InputComponent";
import Entypo from "@expo/vector-icons/Entypo";
import { colors, user } from "@/constants/constants";
import { Link, router } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { AppContext } from "@/components/ContextProviders/AppContext";

const Login = () => {
  const { setUser } = useContext(AppContext) as appContextT;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [step, setStep] = useState(0);
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
              UK Exchange Bank
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

              <View className="w-3/4 md:w-1/2 mx-auto">
                <Button
                  action={() => {
                    if (step === 0 && email) {
                      setStep(1);
                    } else if (step === 0 && !password) {
                      setEmailError("Enter Email");
                    } else if (step === 1 && password) {
                      console.log("submit");
                      setUser(user);
                      router.push("/dashboard");
                    } else if (step === 1 && !password) {
                      setPasswordError("Provide Password");
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
