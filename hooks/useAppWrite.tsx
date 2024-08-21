import { Client, Databases, Storage, Account } from "appwrite";
const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("66c5996a00064dbbc1bd");

export const database = new Databases(client);
export const storage = new Storage(client);
export const account = new Account(client);

export const databaseInfo = {
  id: "66c59a7c0011b8bfdbd4",
  collections: {
    users: "66c59a8b002e71456ba4",
    "bank-info": "66c5a0d500033270e6cd",
    notifications: "66c5a251001e091fe724",
    transactions: "66c59ed0002509d841e2",
  },
};

export const storageId = "66c6232e002eb7f9554c";
