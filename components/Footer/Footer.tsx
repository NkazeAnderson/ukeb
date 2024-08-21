import { View, Text, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";

const Footer = () => {
  return (
    <View className="">
      <View className="border-t py-4 border-gray px-2 md:px-3 lg:px-6 space-y-4">
        <Text className="font-medium text-18 md:text-20 lg:text-24 text-white">
          Important Information
        </Text>
        <Text className="font-regular text-16 text-white">
          1. You need to be 18 over to access this product or service using the
          app. T&Cs apply.(Return to reference)
        </Text>
        <Text className="font-regular text-16 text-white">
          2. When you open a business account using Online Banking, you’ll get
          free access to the FreshBooks package developed exclusively for our
          business customers. FreshBooks is offering this free for anyone who
          has a business current account with us. UK Exchange Bank PLC only gets
          commission from upgrades.
        </Text>
        <Text className="font-regular text-16 text-white">
          The package is based on the existing FreshBooks £22 a month package,
          with some additional features. FreshBooks usually charges for its
          packages. You’ll only get the FreshBooks service free if you complete
          the sign-up journey with FreshBooks through our Online Banking
          referral and agree to the FreshBooks terms and conditions. The service
          will be free for as long as you continue to be an eligible UK Exchange
          business customer. If you close all your business current accounts,
          your free use of the FreshBooks service will end. If we end our
          partnership with FreshBooks, you won’t get the FreshBooks service free
          anymore. We’ll let you know if that happens. You’ll then need to
          download all your data and reports to make sure you keep your records
          safe and secure, so that you comply with Making Tax Digital
          requirements. Find out more at
          gov.uk/government/publications/making-tax-digital/overview-of-making-tax-digital
          We don’t offer tax advice. If you’re not sure about tax, or how VAT
          and other forms of tax work, seek independent financial advice. You
          can find more information about tax on gov.uk. You can choose to
          upgrade to a paid FreshBooks package at your own cost. If you decide
          to upgrade from the free FreshBooks service to another FreshBooks
          plan, and pay the full price to FreshBooks, UK Exchange Bank PLC may
          receive commission for this from FreshBooks. Referred products are
          owned and provided by FreshBooks. Alternative service providers in the
          market may offer similar products. If you sign up to FreshBooks,
          you’ll need to read and accept their terms and conditions, if you
          agree with them. Once you become a FreshBooks customer, you’re bound
          by their terms and conditions. (Return to reference) Subject to terms,
          conditions and eligibility. (Return to reference)
        </Text>
      </View>
      <View className="bg-gray py-4 border-t border-gray px-2 md:px-3 lg:px-6">
        <Text className="font-medium text-18 md:text-20 lg:text-24 text-white">
          Quick Links
        </Text>
        <View className="flex flex-row flex-wrap space-x-5 py-7">
          <Link
            href={"/"}
            className="font-regular text-16 underline underline-offset-2 text-white"
          >
            Home
          </Link>
          <Link
            href={"/dashboard"}
            className="font-regular text-16 underline underline-offset-2 text-white"
          >
            My Account
          </Link>
        </View>
        <View className="border-t border-gray-text">
          <Text className=" font-italics text-[14px] text-white">
            UK Exchange Bank UK PLC and UK Exchange Bank PLC are each authorised
            by the Prudential Regulation Authority and regulated by the
            Financial Conduct Authority and the Prudential Regulation Authority.
            UK Exchange Insurance Services Company Limited and UK Exchange
            Investment Solutions Limited are each authorised and regulated by
            the Financial Conduct Authority.
          </Text>
        </View>
        <View className="flex flex-col md:flex-row items-center justify-center space-y-2 lg:space-x-2">
          <Image source={require("@/assets/images/footer1.png")} />
          <Image source={require("@/assets/images/footer2.png")} />
          <Image source={require("@/assets/images/footer3.png")} />
        </View>
      </View>
    </View>
  );
};

export default Footer;
