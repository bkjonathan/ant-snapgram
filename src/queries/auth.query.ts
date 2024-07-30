import { useMutation } from "@tanstack/react-query";
import { INewUser } from "../types";
import { createUser } from "../api";
import { ISignInUser } from "../types/user.type.ts";
import { signInAccount } from "../api/auth.api.ts";

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
