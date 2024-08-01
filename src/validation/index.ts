import { z } from "zod";

export const SignUpSchema = z.object({
	name: z.string().min(3).max(30),
	username: z.string().min(3).max(30),
	email: z.string().email(),
	password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const PostValidation = z.object({
	caption: z
		.string()
		.min(5, { message: "Minimum 5 characters." })
		.max(2200, { message: "Maximum 2,200 caracters" }),
	file: z.custom<File[]>(),
	location: z
		.string()
		.min(1, { message: "This field is required" })
		.max(1000, { message: "Maximum 1000 characters." }),
	tags: z.string(),
});
