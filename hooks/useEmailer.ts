import emailjs from "@emailjs/react-native";

export async function sendSignUpEmail({
  email,
  firstName,
}: {
  email: string;
  firstName: string;
}) {
  try {
    await emailjs.send(
      "service_z4w1at7",
      "template_sq40js1",
      { email, firstName },
      {
        publicKey: process.env.EXPO_PUBLIC_Email_Key,
      }
    );
  } catch (error) {
    console.log(error);
  }
}
export async function sendNotificationEmail({ message }: { message: string }) {
  try {
    await emailjs.send(
      "service_z4w1at7",
      "template_5km5yf9",
      { message },
      {
        publicKey: process.env.EXPO_PUBLIC_Email_Key,
      }
    );
  } catch (error) {
    console.log(error);
  }
}
