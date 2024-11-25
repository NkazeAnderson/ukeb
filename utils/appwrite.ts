import { isWeb } from "@/constants/environment";
import {
  account,
  database,
  databaseInfo,
  storage,
  storageId,
  webstorage,
} from "@/hooks/useAppWrite";
import { ImagePickerAsset } from "expo-image-picker";
import { ID, Models, Query } from "react-native-appwrite";

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

export async function createUser(user: Omit<userT, "$id">) {
  const $id = ID.unique();
  await database.createDocument(
    databaseInfo.id,
    databaseInfo.collections.users,
    $id,
    user
  );
  return { ...user, $id } as userT;
}
export async function createAccount(user: userT) {
  await account.create(
    user.$id,
    user.pseudoEmail ? user.pseudoEmail : user.email,
    user.password
  );
}
export async function uploadImage(file: ImagePickerAsset) {
  let res: string;
  if (isWeb) {
    const data = await webstorage.createFile(
      storageId,
      ID.unique(),
      new File([await (await fetch(file.uri)).blob()], `${ID.unique()}`)
    );
    res = data.$id;
  } else {
    const data = await storage.createFile(storageId, ID.unique(), {
      name: file.fileName ?? ID.unique(),
      size: file.fileSize as number,
      uri: file.uri,
      type: file.mimeType as string,
    });
    res = data.$id;
  }
  return res;
}
