import { account, database, databaseInfo } from "@/hooks/useAppWrite";
import { Query } from "react-native-appwrite";

export async function getUserByEmail(email: string) {
  const res = await database.listDocuments(
    databaseInfo.id,
    databaseInfo.collections.users,
    [Query.equal("email", email)]
  );
  if (res.total) {
    //@ts-expect-error is user object
    return res.documents[0] as userT;
  } else {
    throw new Error("User not found");
  }
}
export async function createAppWriteSession(authDetails: {
  pseudo?: string;
  email: string;
  password: string;
}) {
  try {
    await account.getSession("current");
  } catch (error) {
    authDetails.pseudo
      ? await account.createEmailPasswordSession(
          authDetails.pseudo,
          authDetails.password
        )
      : await account.createEmailPasswordSession(
          authDetails.email,
          authDetails.password
        );
  }
}
export async function destroyAppWriteSession() {
  await account.deleteSession("current");
}
