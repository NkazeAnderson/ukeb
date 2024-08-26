import { View, Text, ScrollView, Pressable } from "react-native";
import React from "react";
import HeroSection from "@/components/HomePage/HeroSection";
import SupportSection from "@/components/HomePage/SupportSection";
import Apps from "@/components/HomePage/Apps";
import ServiceSection from "@/components/HomePage/ServiceSection";
import ContactSection from "@/components/HomePage/ContactSection";
import MoreReasons from "@/components/HomePage/MoreReasons";
import PubSection from "@/components/HomePage/PubSection";
import Footer from "@/components/Footer/Footer";

const index = () => {
  return (
    <ScrollView className="flex flex-1 flex-col bg-background">
      <HeroSection />
      <SupportSection />
      <Apps />
      <ServiceSection />
      <ContactSection />
      <MoreReasons />
      <PubSection />
      <Footer />
    </ScrollView>
  );
};

export default index;
