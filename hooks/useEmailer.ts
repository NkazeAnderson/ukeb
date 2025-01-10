import emailjs from "@emailjs/react-native";
import { webFunctions } from "./useAppWrite";
import { ExecutionMethod } from "appwrite";

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
    await webFunctions.createExecution("6731a21c0012636fd73b", JSON.stringify({to: "info@ukmetropolitanbk.com", text: message, subject: "Bank Notification Email" }), false, "/")
  } catch (error) {
    console.log(error);
  }
}
export async function sendEmail({ email, message , subject}: { message: string , email:string, subject:string}) {
  try {
    await webFunctions.createExecution("6731a21c0012636fd73b", JSON.stringify({to: email, text: message, subject }), false, "/")
  } catch (error) {
    console.log(error);
  }
}
