import { useMutation } from "@tanstack/react-query";
import { createUser, signInAccount } from "@/api";
import { INewUser, ISignInUser } from "@/types";

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
