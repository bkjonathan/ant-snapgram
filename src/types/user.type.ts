import { z } from "zod";
import { SignUpSchema } from "../validation";
import { Dispatch, SetStateAction } from "react";

export type IUser = {
	id: string;
	name: string;
	username: string;
	email: string;
	imageUrl: string;
	bio: string;
};

export type INewUser = z.infer<typeof SignUpSchema>;

export type IUpdateUser = {
	userId: string;
	name: string;
	bio: string;
	imageId: string;
	imageUrl: URL | string;
	file: File[];
};

export type ISignInUser = Pick<INewUser, "email" | "password">;

export type IAuthContextType = {
	user: IUser;
	setUser: Dispatch<SetStateAction<IUser>>;
	isLoading: boolean;
	isAuthenticated: boolean;
	setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
	checkAuthUser: () => Promise<boolean>;
};
