export const appWriteConfig = {
	projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
	url: import.meta.env.VITE_APPWRITE_URL,
	storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
	databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
	userCollectionId: import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
	postCollectionId: import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID,
	saveCollectionId: import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID,
};
