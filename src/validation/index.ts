import { z } from "zod";

export const SignUpSchema = z.object({
	name: z.string().min(3).max(30),
	username: z.string().min(3).max(30),
	email: z.string().email(),
	password: z.string().min(8, "Password must be at least 8 characters long"),
});
