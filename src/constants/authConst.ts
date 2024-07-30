import { IAuthContextType } from "../types/user.type.ts";

export const INIT_USER = {
	id: "",
	name: "",
	username: "",
	email: "",
	imageUrl: "",
	bio: "",
};

export const AUTH_INIT_STATE: IAuthContextType = {
	user: INIT_USER,
	setUser: () => {},
	isLoading: false,
	isAuthenticated: false,
	setIsAuthenticated: () => {},
	checkAuthUser: async () => false as boolean,
};
