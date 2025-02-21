import { View, Text } from "react-native";
import React, { useContext, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "@/constants/constants";
import { Link } from "expo-router";
import InputComponent from "@/components/ui/InputComponent";
import Button from "@/components/ui/Button";
import { ScrollView } from "react-native-gesture-handler";
import Footer from "@/components/Footer/Footer";
import { AppContext } from "@/components/ContextProviders/AppContext";

const contactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState(false);
  const { bankInfo } = useContext(AppContext) as appContextT;
  function submit() {
    setPending(true);
    setTimeout(() => {
      setSent(true);
      setPending(false);
    }, 2000);
    setEmail("");
    setName("");
    setMessage("");
  }
  return (
    <View className="flex flex-1 bg-background p-2 px-2 md:px-3 lg:px-6">
      <ScrollView className="flex flex-1">
        <Text className="font-bold text-white text-32 lg:text-48 text-center">
          Contact Us
        </Text>
        <View className="flex flex-col lg:flex-row">
          <View className="px-4  lg:w-1/2">
            <Text className="font-regular text-white text-16 py-3">
              We are available 24/7 to attend to your inquires. For faster
              response, Contact us via email or whatsapp. Our phone lines
              recieves a lot of traffic may or may not be attended to in real
              time
            </Text>
            <View className="space-y-2">
              {bankInfo.phone && (
                <View className="flex flex-row space-x-2 items-center">
                  <FontAwesome name="phone" size={18} color={colors.white} />
                  <Text className="font-medium text-18 text-white">Phone:</Text>
                  <Link
                    href={`tel:+${bankInfo.phone}`}
                    className="font-regular text-16 text-primary"
                  >
                    {`+${bankInfo.phone}`}
                  </Link>
                </View>
              )}
              {bankInfo.email && (
                <View className="flex flex-row space-x-2 items-center">
                  <FontAwesome
                    name="mail-forward"
                    size={18}
                    color={colors.white}
                  />
                  <Text className="font-medium text-18 text-white">Email:</Text>
                  <Link
                    href={`mailto:${bankInfo.email}`}
                    className="font-regular text-16 text-primary"
                  >
                    {bankInfo.email}
                  </Link>
                </View>
              )}
              {bankInfo.whatsapp1 && (
                <View className="flex flex-row space-x-2 items-center">
                  <FontAwesome name="whatsapp" size={18} color={colors.white} />
                  <Text className="font-medium text-18 text-white">
                    Whatsapp:
                  </Text>
                  <Link
                    href={`https://wa.me/+${bankInfo.whatsapp1}`}
                    target="_blank"
                    className="font-regular text-16 text-primary"
                  >
                    {"+" + bankInfo.whatsapp1}
                  </Link>
                </View>
              )}
              {bankInfo.whatsapp && (
                <View className="flex flex-row space-x-2 items-center">
                  <FontAwesome name="whatsapp" size={18} color={colors.white} />
                  <Text className="font-medium text-18 text-white">
                    Whatsapp:
                  </Text>
                  <Link
                    href={`https://wa.me/+${bankInfo.whatsapp}`}
                    target="_blank"
                    className="font-regular text-16 text-primary"
                  >
                    {"+" + bankInfo.whatsapp}
                  </Link>
                </View>
              )}
              {bankInfo.address && (
                <View className="flex flex-row space-x-2 items-center">
                  <FontAwesome
                    name="location-arrow"
                    size={18}
                    color={colors.white}
                  />
                  <Text className="font-medium text-18 text-white">
                    Address:
                  </Text>
                  <Text className="font-regular text-16 text-white">
                    {bankInfo.address}
                  </Text>
                </View>
              )}
            </View>
          </View>
          <View className="px-4  lg:w-1/2">
            <Text className="font-medium text-white text-24 py-3">
              Send Us a Quick Email
            </Text>
            <View className="space-y-2">
              {sent && (
                <Text className="font-regular text-secondary text-16">
                  Email Sent
                </Text>
              )}
              <InputComponent
                value={name}
                setValue={setName}
                label="Your name"
                whiteBg
              />
              <InputComponent
                value={email}
                setValue={setEmail}
                label="Your email"
                whiteBg
              />
              <InputComponent
                value={message}
                setValue={setMessage}
                label="Your Message"
                whiteBg
                numberOfLines={4}
              />
              <View className="px-[25%] py-4">
                <Button
                  action={submit}
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
        <Footer />
      </ScrollView>
    </View>
  );
};

export default contactUs;
