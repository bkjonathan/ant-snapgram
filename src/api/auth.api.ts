import { INewUser } from "@/types";
import { ID, Query } from "appwrite";
import { account, avatars, database } from "./appwrite.ts";
import { appWriteConfig } from "@/config";
import { ISignInUser } from "@/types";

export async function createUser(user: INewUser) {
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
		throw new Error("Failed to create user account");
	}
}

export async function signInAccount(user: ISignInUser) {
	return await account.createEmailPasswordSession(user.email, user.password);
}

export async function getUsers(limit: number) {
	try {
		const queries: string[] = [Query.orderDesc("$createdAt")];

		if (limit) {
			queries.push(Query.limit(limit));
		}

		return await database.listDocuments(
			appWriteConfig.databaseId,
			appWriteConfig.userCollectionId,
			queries,
		);
	} catch (error) {
		console.error("Error getting users:", error);
		throw new Error("Failed to get users");
	}
}

export async function getCurrentUser() {
	try {
		const currentAccount = await account.get();

		if (!currentAccount) {
			throw new Error("No user found");
		}
		const currentUser = await database.listDocuments(
			appWriteConfig.databaseId,
			appWriteConfig.userCollectionId,
			[Query.equal("accountId", currentAccount.$id)],
		);

		if (!currentUser?.documents.length) {
			throw new Error("User not found in database");
		}
		return currentUser.documents[0];
	} catch (error) {
		console.error("Error getting current user:", error);
		throw new Error("Failed to get current user");
	}
}

export async function signOut() {
	try {
		return await account.deleteSession("current");
	} catch (error) {
		console.error("Error signing out:", error);
		throw error;
	}
}
