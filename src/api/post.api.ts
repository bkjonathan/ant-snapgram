import { INewPost } from "@/types";
import { deleteFile, getFilePreview, uploadFile } from "@/api/file.api.ts";
import { database } from "@/api/appwrite.ts";
import { appWriteConfig } from "@/config";
import { ID, Query } from "appwrite";

export async function createPost(payload: INewPost) {
	// Upload file to appwrite storage
	const uploadedFile = await uploadFile(payload.file[0]);

	if (!uploadedFile) {
		throw new Error("Failed to upload file");
	}

	// get file url
	const fileUrl = getFilePreview(uploadedFile.$id);

	if (!fileUrl) {
		await deleteFile(uploadedFile.$id);
		throw new Error("Failed to get file url");
	}

	// convert tags to array
	const tags = payload.tags?.split(",").map((tag) => tag.trim());

	// Create new post
	const newPost = await database.createDocument(
		appWriteConfig.databaseId,
		appWriteConfig.postCollectionId,
		ID.unique(),
		{
			creator: payload.userId,
			caption: payload.caption,
			imageId: uploadedFile.$id,
			imageUrl: fileUrl,
			location: payload.location,
			tags,
		},
	);

	if (!newPost) {
		await deleteFile(uploadedFile.$id);
		throw new Error("Failed to create post");
	}

	return newPost;
}

export async function getRecentPosts() {
	return await database.listDocuments(
		appWriteConfig.databaseId,
		appWriteConfig.postCollectionId,
		[Query.orderDesc("$createdAt"), Query.limit(10)],
	);
}
