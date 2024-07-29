import { Account, Avatars, Client, Databases, Storage } from "appwrite";
import { appWriteConfig } from "../config";

export const client = new Client();
client.setProject(appWriteConfig.projectId);
client.setEndpoint(appWriteConfig.url);

export const account = new Account(client);
export const database = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
