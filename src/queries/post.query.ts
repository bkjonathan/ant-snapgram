import {
	useInfiniteQuery,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import { INewPost, IUpdatePost } from "@/types";
import { createPost, getInfinitePosts } from "@/api";
import { QUERY_KEYS } from "@/constants";
import {
	getPostById,
	getRecentPosts,
	likePost,
	updatePost,
} from "@/api/post.api.ts";
import { Models } from "appwrite";

export const useGetRecentPosts = () => {
	return useQuery({
		queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
		queryFn: getRecentPosts,
	});
};
export const useCreatePost = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (post: INewPost) => createPost(post),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
			});
		},
	});
};

export const useUpdatePost = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (post: IUpdatePost) => updatePost(post),
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
			});
		},
	});
};
export const useGetPostById = (postId?: string) => {
	return useQuery({
		queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
		queryFn: () => getPostById(postId || ""),
		enabled: !!postId,
	});
};

export const useLikePost = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({
			postId,
			likesArray,
		}: {
			postId: string;
			likesArray: string[];
		}) => likePost(postId, likesArray),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
			});
		},
	});
};

export const useGetPosts = () => {
	return useInfiniteQuery({
		queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
		queryFn: getInfinitePosts as any,
		getNewPageParam: (lastPage: Models.Document) => {
			// If there's no data, there are no more pages.
			if (lastPage && lastPage.documents.length === 0) {
				return null;
			}

			// Use the $id of the last document as the cursor.
			const lastId = lastPage.documents[lastPage.documents.length - 1].$id;
			return lastId;
		},
	});
};
