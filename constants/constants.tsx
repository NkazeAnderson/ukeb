import { ImageSourcePropType } from "react-native";

export const colors = {
  primary: "#2a76c6",
  secondary: "#c04317",
  danger: "#bf161d",
  success: "#12bc15",
  white: "#ffffff",
  black: "",
  gray: "#292b3d",
  "gray-text": "#cbccd1",
  background: "#161b2f",
};
export const baseAccountNumber = "GB34MYMB230580433889";
// export const user: userT = {
//   firstName: "Wale",
//   lastName: "Wale",
//   email: "Wale@gmail.com",
//   phone: "671 172 1882",
//   balance: 0,
//   accountNumber: 0,
//   profilePic:
//     "https://us.images.westend61.de/0001336530pw/happy-male-and-female-business-people-talking-while-standing-in-office-MASF16839.jpg",
//   identification:
//     "https://us.images.westend61.de/0001336530pw/happy-male-and-female-business-people-talking-while-standing-in-office-MASF16839.jpg",
// };

export const supports: {
  icon: ImageSourcePropType;
  heading: string;
  body: string;
}[] = [
  {
    icon: require("@/assets/images/clock.svg"),
    heading: "24/7 business support",
    body: "Send us a message from the Help section of your app(1) 24 hours a day, 7 days a week. Switch notifications on so you know when we’ve replied. ",
  },
  {
    icon: require("@/assets/images/suitecase.svg"),
    heading: "900,000 businesses bank with us",
    body: "Join a community of over 900,000 businesses benefitting from expert support, partnerships and finance services.",
  },
  {
    icon: require("@/assets/images/investment.svg"),
    heading: "Over 300 years of expertise ",
    body: "Benefit from our experience and knowledge, and services that cover most industry sectors.",
  },
  {
    icon: require("@/assets/images/padlock.svg"),
    heading: "24-hour fraud protection",
    body: "Keep your finances safe – we look out for you and your money around the clock.",
  },
  {
    icon: require("@/assets/images/fscs.svg"),
    heading: "Up to £85,000 FSCS protected ",
    body: "Get guaranteed protection of up to a total of £85,000 by the FSCS if your bank goes out of business.",
  },
  {
    icon: require("@/assets/images/switch-guarantee-logo-pos.png"),
    heading: "Hassle-free switch guarantee",
    body: "Switch to us and we guarantee to move all your incoming and outgoing payments on your switch date for free.",
  },
];

export const services: {
  heading: string;
  body: string;
  points: string[];
  buttonText: string;
}[] = [
  {
    heading: "Setting up your business",
    body: "We’ve made it as easy as possible to get started. We offer a range of business start-up tools and services, including:",
    points: [
      "Free accounting software",
      "Solutions to accept cards with Barclaycard Payments. (Subject to application, financial circumstances and borrowing history. T&Cs apply)",
      "Cashback and rewards with a Barclaycard business credit card. (Subject to application, financial circumstances and borrowing history. T&Cs apply)",
      "Eagle Labs accelerator programmes",
      "Support to help your business become more sustainable",
      "Banking from wherever you are when you download and register for our app.",
    ],
    buttonText: "Open a business account",
  },
  {
    heading: "Planning for business growth",
    body: "As your business takes off, your financial needs will change and the services and support you’ll need will start to grow. We provide:",
    points: [
      "Access to foreign exchange accounts",
      " International trade specialists",
      " Wider services from approved partners",
      "Access to specialist lending",
      "Introductions to investors",
      "Access to a team of experts in your industry sector",
      "Business growth coaching programmes.",
    ],
    buttonText: "Swicth your account to us",
  },
  {
    heading: "Support for established businesses ",
    body: "As an established business, you’ll enjoy our services and support, with access to other valuable benefits such as:",
    points: [
      "Specialist support from industry experts",
      "A relationship team for your business",
      "Multi-director account access",
      "An introduction to our complex payments platform",
      "Invitations to networking and business events",
      "Opportunities to connect with investors",
      "Access to corporate services when you need them.",
    ],
    buttonText: "Established Businesses",
  },
];

export const moreReasons: {
  image: ImageSourcePropType;
  heading: string;
  body: string;
}[] = [
  {
    image: require("@/assets/images/sustain.svg"),
    heading: "Net Zero Specialists supporting your journey towards net zero",
    body: "Our Net Zero Specialists can help you to explore the options available on your transition journey towards net zero, working with you to assess your current level of progress and providing tailored next steps and resources. ",
  },
  {
    image: require("@/assets/images/insights.svg"),
    heading: "Specialist support and insights for many key industries",
    body: "Our industry sector experts support businesses across areas such as high growth and entrepreneurs, agriculture, real estate, professional services, healthcare and more. Plus, we provide support and knowledge for brokers and introducers.",
  },
  {
    image: require("@/assets/images/rewards.svg"),
    heading: "A marketplace full of rewards for banking with us",
    body: "Our partners offer many services and extra support. Find out more about our approved partners who can offer you payment services, workplace pensions and more.",
  },
  {
    image: require("@/assets/images/currency.svg"),
    heading:
      "Over 17 foreign currency accounts available for international businesses",
    body: "Avoid the fees that can come with exchanging and transferring foreign currencies – apply for our Foreign Currency Account.",
  },
];
