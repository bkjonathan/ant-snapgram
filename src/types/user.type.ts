import { z } from "zod";
import { SignUpSchema } from "../validation";

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
