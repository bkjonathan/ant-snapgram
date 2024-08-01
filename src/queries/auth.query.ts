import { useMutation, useQuery } from "@tanstack/react-query";
import { createUser, getCurrentUser, signInAccount, signOut } from "@/api";
import { INewUser, ISignInUser } from "@/types";
import { QUERY_KEYS } from "@/constants";

export const useCreateUser = () => {
	return useMutation({
		mutationFn: (user: INewUser) => createUser(user),
	});
};

export function useSignIn() {
	return useMutation({
		mutationFn: (user: ISignInUser) => signInAccount(user),
	});
}
export const useSignOut = () => {
	return useMutation({
		mutationFn: signOut,
	});
};

export const useGetCurrentUser = () => {
	return useQuery({
		queryKey: [QUERY_KEYS.GET_CURRENT_USER],
		queryFn: getCurrentUser,
	});
};
