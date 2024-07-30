import { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "@/api";
import { AUTH_INIT_STATE, INIT_USER } from "@/constants";
import { IAuthContextType, IUser } from "@/types";

export const AuthContext = createContext<IAuthContextType>(AUTH_INIT_STATE);

const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<IUser>(INIT_USER);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const checkAuthUser = async () => {
		console.log("checkAuthUser method is calling");
		try {
			let result = false;
			setIsLoading(true);
			const currentAccount = await getCurrentUser();

			if (currentAccount) {
				const { $id, name, username, email, imageUrl, bio } = currentAccount;
				setUser({
					id: $id,
					name,
					username,
					email,
					imageUrl,
					bio,
				});
				setIsAuthenticated(true);
				result = true;
			}
			console.log(result, "result from auth provider");
			return result;
		} catch (e) {
			console.error("Error checking user authentication:", e);
			return false;
		} finally {
			setIsLoading(false);
		}
	};
	useEffect(() => {
		const cookieFallback = localStorage.getItem("cookieFallback");
		if (!cookieFallback || cookieFallback === "[]") {
			navigate("/sign-in");
		} else {
			checkAuthUser();
		}
	}, []);
	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				isLoading,
				user,
				setUser,
				setIsAuthenticated,
				checkAuthUser,
			}}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
