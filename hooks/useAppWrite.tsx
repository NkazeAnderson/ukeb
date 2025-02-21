import { Client, Databases, Storage, Account } from "react-native-appwrite";
import {
  Client as WebClient,
  Storage as WebStorage,
  Functions as WebFunctions,
} from "appwrite";
const client = new Client();
const webClient = new WebClient();
webClient
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("66c5996a00064dbbc1bd");
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("66c5996a00064dbbc1bd")
  .setPlatform("com.walexxx23.ukmb");

export const database = new Databases(client);
export const storage = new Storage(client);
export const webstorage = new WebStorage(webClient);
export const account = new Account(client);
export const webFunctions = new WebFunctions(webClient);
export const databaseInfo = {
  id: "66c59a7c0011b8bfdbd4",
  collections: {
    users: "66c59a8b002e71456ba4",
    "bank-info": "66c5a0d500033270e6cd",
    notifications: "66c5a251001e091fe724",
    transactions: "66c59ed0002509d841e2",
    cardTransactions: "67b847560011c025a78d",
  },
};

export const storageId = "66c6232e002eb7f9554c";
export const bankDocId = "66c6c1e800382827d01d";
