import { INewPost, IUpdatePost } from "@/types";
import { deleteFile, getFilePreview, uploadFile } from "@/api/file.api.ts";
import { database } from "@/api/appwrite.ts";
import { appWriteConfig } from "@/config";
import { ID, Models, Query } from "appwrite";

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

export async function getPostById(postId: string) {
	return await database.getDocument(
		appWriteConfig.databaseId,
		appWriteConfig.postCollectionId,
		postId,
	);
}

export async function updatePost(post: IUpdatePost) {
	const hasFileToUpdate = post.file.length > 0;

	let image = {
		imageUrl: post.imageUrl,
		imageId: post.imageId,
	};

	if (hasFileToUpdate) {
		const uploadedFile = await uploadFile(post.file[0]);

		if (!uploadedFile) {
			throw new Error("Failed to upload file");
		}

		const fileUrl = getFilePreview(uploadedFile.$id);

		if (!fileUrl) {
			await deleteFile(uploadedFile.$id);
			throw new Error("Failed to get file url");
		}

		image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id };
	}

	// Convert tags into array
	const tags = post.tags?.replace(/ /g, "").split(",") || [];

	//  Update post
	const updatedPost = await database.updateDocument(
		appWriteConfig.databaseId,
		appWriteConfig.postCollectionId,
		post.postId,
		{
			caption: post.caption,
			imageUrl: image.imageUrl,
			imageId: image.imageId,
			location: post.location,
			tags: tags,
		},
	);

	// Failed to update
	if (!updatedPost) {
		// Delete new file that has been recently uploaded
		if (hasFileToUpdate) {
			await deleteFile(image.imageId);
		}

		// If no new file uploaded, just throw error
		throw Error;
	}
	// Safely delete old file after successful update
	if (hasFileToUpdate) {
		await deleteFile(post.imageId);
	}

	return updatedPost;
}
export async function likePost(postId: string, likesArray: string[]) {
	return await database.updateDocument(
		appWriteConfig.databaseId,
		appWriteConfig.postCollectionId,
		postId,
		{
			likes: likesArray,
		},
	);
}

export function deletePost(postId: string, imageId: string) {
	return Promise.all([
		database.deleteDocument(
			appWriteConfig.databaseId,
			appWriteConfig.postCollectionId,
			postId,
		),
		deleteFile(imageId),
	]);
}

export async function getInfinitePosts({
	pageParam,
}: {
	pageParam: number;
}): Promise<Models.DocumentList<Models.Document>> {
	const queries: string[] = [Query.orderDesc("$updatedAt"), Query.limit(9)];

	if (pageParam) {
		queries.push(Query.cursorAfter(pageParam.toString()));
	}
	return await database.listDocuments(
		appWriteConfig.databaseId,
		appWriteConfig.postCollectionId,
		queries,
	);
}
