import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { INewPost } from "@/types";
import { createPost } from "@/api";
import { QUERY_KEYS } from "@/constants";
import { getRecentPosts } from "@/api/post.api.ts";

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
