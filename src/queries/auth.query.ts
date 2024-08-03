import { useMutation, useQuery } from "@tanstack/react-query";
import {
	createUser,
	getCurrentUser,
	getUsers,
	signInAccount,
	signOut,
} from "@/api";
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

export const useGetUsers = (limit?: number) => {
	return useQuery({
		queryKey: [QUERY_KEYS.GET_USERS],
		queryFn: () => getUsers(limit || 10),
	});
};

export const useGetCurrentUser = () => {
	return useQuery({
		queryKey: [QUERY_KEYS.GET_CURRENT_USER],
		queryFn: getCurrentUser,
	});
};
