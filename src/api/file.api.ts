import { storage } from "@/api/appwrite.ts";
import { appWriteConfig } from "@/config";
import { ID, ImageGravity, Models } from "appwrite";

export async function uploadFile(file: File): Promise<Models.File | undefined> {
	try {
		return await storage.createFile(
			appWriteConfig.storageId,
			ID.unique(),
			file,
		);
	} catch (e) {
		console.log(e);
	}
}

export function getFilePreview(fileId: string) {
	try {
		return storage.getFilePreview(
			appWriteConfig.storageId,
			fileId,
			2000,
			2000,
			ImageGravity.Top,
			100,
		);
	} catch (error) {
		console.log(error);
	}
}

export async function deleteFile(fileId: string) {
	try {
		await storage.deleteFile(appWriteConfig.storageId, fileId);
		return { success: true };
	} catch (error) {
		console.log(error);
	}
}
