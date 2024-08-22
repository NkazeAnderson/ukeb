import { View, Text, Image, TextInput, ScrollView } from "react-native";
import React, { useRef, useState } from "react";
import Button from "@/components/ui/Button";
import InputComponent from "@/components/ui/InputComponent";
import Entypo from "@expo/vector-icons/Entypo";
import { colors } from "@/constants/constants";
import { Link, router } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  account,
  database,
  databaseInfo,
  storage,
  storageId,
} from "@/hooks/useAppWrite";
import { ID, Query } from "appwrite";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import useToast from "@/hooks/useToast";
const getImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
    return result.assets[0];
  }
};

async function checkUserExist(input: { email: string; phone: string }) {
  try {
    const res = await database.listDocuments(
      databaseInfo.id,
      databaseInfo.collections.users,
      [
        Query.or([
          Query.equal("email", input.email),
          Query.equal("phone", input.phone),
        ]),
      ]
    );

    return res.total;
  } catch (error) {
    console.log(error);
  }
}

async function submit(user: Omit<userT, "$id">) {
  console.log(
    new File([await (await fetch(user.profilePic)).blob()], `${ID.unique()}`)
  );

  const profilePic = await storage.createFile(
    storageId,
    ID.unique(),
    new File([await (await fetch(user.profilePic)).blob()], `${ID.unique()}`)
  );

  const identification = await storage.createFile(
    storageId,
    ID.unique(),
    new File(
      [await (await fetch(user.identification)).blob()],
      `${ID.unique()}`
    )
  );

  const pro = storage.getFilePreview(storageId, profilePic.$id);
  const ide = storage.getFilePreview(storageId, identification.$id);
  user.profilePic = String(pro);
  user.identification = String(ide);

  const userFromDb = await database.createDocument(
    databaseInfo.id,
    databaseInfo.collections.users,
    ID.unique(),
    user
  );

  await account.create(userFromDb.$id, user.email, user.password);
}

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [identification, setIdentification] = useState("");
  const [password1, setPassword1] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [password1Error, setPassword1Error] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [pending, setPending] = useState(false);

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
                  This email or phone is registered with us already
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
                      <Button
                        action={() => {
                          getImage().then((res) => {
                            if (res) {
                              setProfilePic(res.uri);
                            }
                          });
                        }}
                        color="secondary"
                        textColor="white"
                      >
                        Face Picture
                      </Button>
                    </View>
                    <View className="lg:w-1/2 py-5">
                      {profilePic && (
                        <Image
                          className="rounded-lg"
                          style={{ width: "100%", height: 200 }}
                          source={{ uri: profilePic }}
                        />
                      )}
                    </View>
                  </View>
                  <View className="space-y-1">
                    <Text className="font-medium text-16 text-primary ">
                      Add your passport or government Id
                    </Text>
                    <View className="w-1/2">
                      <Button
                        action={() => {
                          getImage().then((res) => {
                            if (res) {
                              setIdentification(res.uri);
                            }
                          });
                        }}
                        color="secondary"
                        textColor="white"
                      >
                        Add Document
                      </Button>
                    </View>
                    <View className="lg:w-1/2 py-5">
                      {identification && (
                        <Image
                          className="rounded-lg"
                          style={{ width: "100%", height: 200 }}
                          source={{ uri: identification }}
                        />
                      )}
                    </View>
                  </View>
                </>
              )}

              <View className="w-3/4 md:w-1/2 mx-auto">
                <Button
                  action={() => {
                    setPending(true);
                    if (step === 0) {
                      if (email && phone) {
                        checkUserExist({ email, phone })
                          .then((total) => {
                            if (typeof total === "undefined") {
                              return;
                            }
                            if (total === 0) {
                              setStep(1);
                            } else if (total > 0) {
                              userExist.current = true;
                            }
                          })
                          .finally(() => {
                            setPending(false);
                          });
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

                      if (password !== password1) {
                        setPassword1Error("Passwords don't match");
                      }

                      if (!password) {
                        setPasswordError("Required");
                      } else if (step === 1 && password) {
                        submit({
                          firstName,
                          lastName,
                          email: email.toLowerCase(),
                          phone,
                          balance: 0,
                          profilePic,
                          identification,
                          alert: "new account create",
                          accountNumber: 0,
                          password: password.toLowerCase(),
                        })
                          .then(() => {
                            router.push("/login");
                            useToast({
                              type: "success",
                              text1: "Success",
                              text2:
                                "Successfully created a new account. Please login",
                            });
                          })
                          .catch((e) => {
                            console.log(e);

                            useToast({
                              text1: "Sign Up Failed",
                              text2: "Error signing you up, please retry",
                              type: "error",
                            });
                          })
                          .finally(() => {
                            setPending(false);
                          });
                      } else if (step === 1 && !password) {
                        setPasswordError("Provide Password");
                      }
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
