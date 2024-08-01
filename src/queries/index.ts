import {
	useCreateUser,
	useSignIn,
	useSignOut,
	useGetCurrentUser,
} from "./auth.query.ts";
import {
	useUpdatePost,
	useGetPostById,
	useLikePost,
	useCreatePost,
	useGetRecentPosts,
} from "./post.query.ts";

import { useDeleteSavedPost, useSavePost } from "./save.query.ts";

export {
	useCreateUser,
	useSignIn,
	useSignOut,
	useGetCurrentUser,
	useUpdatePost,
	useGetPostById,
	useLikePost,
	useCreatePost,
	useGetRecentPosts,
	useDeleteSavedPost,
	useSavePost,
};
