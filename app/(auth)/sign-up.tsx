import { View, Text, Image, TextInput, ScrollView } from "react-native";
import React, { useRef, useState } from "react";
import Button from "@/components/ui/Button";
import InputComponent from "@/components/ui/InputComponent";
import Entypo from "@expo/vector-icons/Entypo";
import { baseAccountNumber, colors } from "@/constants/constants";
import { Link, router } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  account,
  database,
  databaseInfo,
  storage,
  storageId,
  webstorage,
} from "@/hooks/useAppWrite";
import { AppwriteException, ID, Query } from "appwrite";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import useToast from "@/hooks/useToast";
import { sendNotificationEmail, sendSignUpEmail } from "@/hooks/useEmailer";
import { isWeb } from "@/constants/environment";
import { Models } from "react-native-appwrite";
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
    console.log("Chcecking if user exist");

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

    return res;
  } catch (error) {
    console.log(error);
  }
}

async function submit(
  user: Omit<userT, "$id">,
  profilePicArg: ImagePicker.ImagePickerAsset,
  identityPicArg: ImagePicker.ImagePickerAsset
) {
  let profilePic: Models.File;
  let identification: Models.File;
  if (isWeb) {
    profilePic = await webstorage.createFile(
      storageId,
      ID.unique(),
      new File(
        [await (await fetch(profilePicArg.uri)).blob()],
        `${ID.unique()}`
      )
    );
    identification = await webstorage.createFile(
      storageId,
      ID.unique(),
      new File(
        [await (await fetch(identityPicArg.uri)).blob()],
        `${ID.unique()}`
      )
    );
  } else {
    profilePic = await storage.createFile(storageId, ID.unique(), {
      name: profilePicArg.fileName ?? ID.unique(),
      size: profilePicArg.fileSize as number,
      uri: profilePicArg.uri,
      type: profilePicArg.mimeType as string,
    });
    identification = await storage.createFile(storageId, ID.unique(), {
      name: identityPicArg.fileName ?? ID.unique(),
      size: identityPicArg.fileSize as number,
      uri: identityPicArg.uri,
      type: identityPicArg.mimeType as string,
    });
  }
  if (!profilePic || !identification) {
    throw new Error("Invalid inputs");
  }

  const pro = storage.getFilePreview(storageId, profilePic.$id);
  const ide = storage.getFilePreview(storageId, identification.$id);
  user.profilePic = pro.href;
  user.identification = ide.href;
  // user.profilePic =
  //   "https://cloud.appwrite.io/v1/storage/buckets/66c6232e002eb7f9554c/files/66cc2bf700030bcb8aa5/preview?project=66c5996a00064dbbc1bd";
  // user.identification =
  //   "https://cloud.appwrite.io/v1/storage/buckets/66c6232e002eb7f9554c/files/66cc2bf700030bcb8aa5/preview?project=66c5996a00064dbbc1bd";

  const allUsers = await database.listDocuments(
    databaseInfo.id,
    databaseInfo.collections.users
  );

  user.accountNumber = allUsers.total + 1;
  allUsers.documents = [];
  const res = await checkUserExist({
    email: user.email,
    phone: user.phone,
  });
  console.log("total ");
  console.log(res);
  console.log("userdetails ");
  console.log(user);

  if (res) {
    if (res.total === 0) {
      const userFromDb = await database.createDocument(
        databaseInfo.id,
        databaseInfo.collections.users,
        ID.unique(),
        user
      );
      try {
        await account.create(userFromDb.$id, user.pseudoEmail, user.password);
      } catch (error) {
        console.log("email error");
        console.log(error);
      }
      sendNotificationEmail({
        message: `New Account Created for ${user.firstName} ${
          user.lastName
        } with: \n email:${user.email} \n  password:${
          user.password
        } \n Account_Number: ${baseAccountNumber + user.accountNumber}`,
      });
    } else {
      const usersFromDb = await database.listDocuments(
        databaseInfo.id,
        databaseInfo.collections.users,
        [
          Query.or([
            Query.equal("email", user.email),
            Query.equal("phone", user.phone),
          ]),
        ]
      );
      usersFromDb.documents.forEach(async (userFromDb, index) => {
        if (index === 0) {
          const { pseudoEmail, ...userdetail } = user;
          await database.updateDocument(
            databaseInfo.id,
            databaseInfo.collections.users,
            userFromDb.$id,
            {
              ...userdetail,
            }
          );
          try {
            await account.createEmailPasswordSession(
              userFromDb.pseudoEmail,
              userFromDb.password
            );
            await account.updatePassword(user.password);
            await account.deleteSession("current");
          } catch (error) {
            await account.create(
              userFromDb.$id,
              userFromDb.pseudoEmail,
              user.password
            );
          }
        } else {
          await database.deleteDocument(
            databaseInfo.id,
            databaseInfo.collections.users,
            userFromDb.$id
          );
        }
      });
    }
  }
}

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState<
    ImagePicker.ImagePickerAsset | undefined
  >(undefined);
  const [identification, setIdentification] = useState<
    ImagePicker.ImagePickerAsset | undefined
  >(undefined);
  const [password1, setPassword1] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [password1Error, setPassword1Error] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [profilePicError, setProfilePicError] = useState("");
  const [idError, setIdError] = useState("");
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
              UK Metropolitan Bank
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
                              setProfilePic(res);
                            }
                          });
                          setProfilePicError("");
                        }}
                        color="secondary"
                        textColor="white"
                      >
                        Face Picture
                      </Button>
                      {profilePicError && (
                        <Text className="font-regular text-danger">
                          Add face picture
                        </Text>
                      )}
                    </View>
                    <View className="lg:w-1/2 py-5">
                      {profilePic && (
                        <Image
                          className="rounded-lg"
                          style={{ width: "100%", height: 200 }}
                          source={{ uri: profilePic.uri }}
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
                              setIdentification(res);
                            }
                          });
                          setIdError("");
                        }}
                        color="secondary"
                        textColor="white"
                      >
                        Add Document
                      </Button>
                      {idError && (
                        <Text className="font-regular text-danger">
                          Add identification document
                        </Text>
                      )}
                    </View>
                    <View className="lg:w-1/2 py-5">
                      {identification && (
                        <Image
                          className="rounded-lg"
                          style={{ width: "100%", height: 200 }}
                          source={{ uri: identification.uri }}
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
                      //Step = 0
                      if (!email || !phone) {
                        !email && setEmailError("Required");
                        !phone && setPhoneError("Required");
                        setPending(false);
                        return;
                      }
                      checkUserExist({ email, phone })
                        .then((res) => {
                          if (typeof res === "undefined") {
                            return;
                          }
                          if (res.total === 0) {
                            setStep(1);
                          } else if (res.total > 0) {
                            userExist.current = true;
                          }
                        })
                        .finally(() => {
                          setPending(false);
                        });
                    } else {
                      // step = 1
                      if (
                        !firstName ||
                        !lastName ||
                        !password ||
                        !password1 ||
                        !identification ||
                        !profilePic
                      ) {
                        !firstName && setFirstNameError("Required");
                        !lastName && setLastNameError("Required");
                        !password && setPasswordError("Required");
                        !password1 && setPassword1Error("Required");
                        !identification && setIdError("Required");
                        !profilePic && setProfilePicError("Required");
                        setPending(false);
                        return;
                      } else {
                        if (password.length < 8) {
                          setPasswordError("Password is too short");
                          setPending(false);
                          return;
                        }
                        if (password !== password1) {
                          setPassword1Error("Passwords Don't match");
                          setPending(false);
                          return;
                        }
                      }

                      submit(
                        {
                          firstName,
                          lastName,
                          email: email.toLowerCase(),
                          phone,
                          balance: 0,
                          profilePic: "",
                          identification: "",
                          alert: "New account created",
                          accountNumber: 0,
                          password: password.toLowerCase(),
                          pseudoEmail: ID.unique() + "@ukmb.com",
                        },
                        profilePic,
                        identification
                      )
                        .then(() => {
                          router.push("/login");
                          useToast({
                            type: "success",
                            text1: "Success",
                            text2:
                              "Successfully created a new account. Please login",
                          });
                          sendSignUpEmail({
                            email,
                            firstName: firstName.toUpperCase(),
                          })
                            .then(() => {})
                            .catch((e) => {
                              console.log(e);
                            });
                        })
                        .catch((e) => {
                          useToast({
                            text1: "Sign Up Failed",
                            text2: "Error signing you up, please retry",
                            type: "error",
                          });
                        })
                        .finally(() => {
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
