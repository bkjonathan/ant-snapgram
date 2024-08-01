import { database } from "@/api/appwrite.ts";
import { appWriteConfig } from "@/config";
import { ID } from "appwrite";

export async function savePost(userId: string, postId: string) {
	return await database.createDocument(
		appWriteConfig.databaseId,
		appWriteConfig.saveCollectionId,
		ID.unique(),
		{
			user: userId,
			post: postId,
		},
	);
}

export async function unSavePost(postId: string) {
	return await database.deleteDocument(
		appWriteConfig.databaseId,
		appWriteConfig.saveCollectionId,
		postId,
	);
}
