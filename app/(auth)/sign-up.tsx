import { View, Text, Image, TextInput, ScrollView } from "react-native";
import React, { useRef, useState } from "react";
import Button from "@/components/ui/Button";
import InputComponent from "@/components/ui/InputComponent";
import Entypo from "@expo/vector-icons/Entypo";
import { colors } from "@/constants/constants";
import { Link } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
function checkUserExist(input: { email: string } | { phone: string }) {
  return false;
}

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [password1Error, setPassword1Error] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");

  const userExist = useRef(false);
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
              Sign Up
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
              ) : (
                <>
                  <View className="flex flex-col md:flex-row items-center md:space-x-2">
                    <View className=" w-full md:flex-1 ">
                      <InputComponent
                        label="First Name"
                        value={firstName}
                        setValue={setFirstName}
                        error={firstNameError}
                        setError={setFirstNameError}
                      />
                    </View>
                    <View className="w-full md:flex-1 ">
                      <InputComponent
                        label="Last Name"
                        value={lastName}
                        setValue={setLastName}
                        error={lastNameError}
                        setError={setLastNameError}
                      />
                    </View>
                  </View>
                  <InputComponent
                    label="Password (Mininum 8)"
                    value={password}
                    setValue={setPassword}
                    error={passwordError}
                    setError={setPasswordError}
                    keyboardType="visible-password"
                  />
                  <InputComponent
                    label="Password Again (Mininum 8)"
                    value={password1}
                    setValue={setPassword1}
                    error={password1Error}
                    setError={setPassword1Error}
                  />
                  <View className="space-y-1">
                    <Text className="font-medium text-16 text-primary ">
                      Add your selfie or face picture
                    </Text>
                    <View className="w-1/2">
                      <Button color="secondary" textColor="white">
                        Face Picture
                      </Button>
                    </View>
                  </View>
                  <View className="space-y-1">
                    <Text className="font-medium text-16 text-primary ">
                      Add your passport or government Id
                    </Text>
                    <View className="w-1/2">
                      <Button color="secondary" textColor="white">
                        Add Document
                      </Button>
                    </View>
                  </View>
                </>
              )}

              <View className="w-3/4 md:w-1/2 mx-auto">
                <Button
                  action={() => {
                    if (step === 0) {
                      if (email && phone) {
                        checkUserExist({ email })
                          ? (userExist.current = true)
                          : checkUserExist({ phone })
                          ? (userExist.current = true)
                          : setStep(1);
                      }
                      if (!email) {
                        setEmailError("Required");
                      }
                      if (!phone) {
                        setPhoneError("Required");
                      }
                    } else {
                      if (!firstName) {
                        setFirstNameError("Required");
                      }
                      if (!lastName) {
                        setLastNameError("Required");
                      }

                      if (!password) {
                        setEmailError("Enter Email");
                      } else if (step === 1 && password) {
                        console.log("submit");
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

export default SignUp;
