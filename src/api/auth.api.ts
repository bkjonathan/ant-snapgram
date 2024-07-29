import { INewUser } from "../types";
import { ID } from "appwrite";
import { account, avatars, database } from "./appwrite.ts";
import { appWriteConfig } from "../config";

export async function createUserAccount(user: INewUser) {
	try {
		const newAccount = await account.create(
			ID.unique(),
			user.email,
			user.password,
			user.name,
		);

		const avatarUrl = avatars.getInitials(user.name);

		return await database.createDocument(
			appWriteConfig.databaseId,
			appWriteConfig.userCollectionId,
			ID.unique(),
			{
				accountId: newAccount.$id,
				name: newAccount.name,
				username: user.username,
				email: user.email,
				imageUrl: avatarUrl,
			},
		);
	} catch (error) {
		console.error("Error creating user account:", error);
		throw error;
	}
}
