import { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "@/api";
import { AUTH_INIT_STATE, INIT_USER } from "@/constants";
import { IAuthContextType, IUser } from "@/types";

export const AuthContext = createContext<IAuthContextType>(AUTH_INIT_STATE);

const AuthProvider = ({ children }: { children: ReactNode }) => {
	const navigate = useNavigate();
	const [user, setUser] = useState<IUser>(INIT_USER);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const checkAuthUser = async () => {
		// setIsLoading(true);
		try {
			const currentAccount = await getCurrentUser();
			if (currentAccount) {
				setUser({
					id: currentAccount.$id,
					name: currentAccount.name,
					username: currentAccount.username,
					email: currentAccount.email,
					imageUrl: currentAccount.imageUrl,
					bio: currentAccount.bio,
				});
				setIsAuthenticated(true);

				return true;
			}

			return false;
		} catch (error) {
			console.error(error);
			return false;
		} finally {
			setIsLoading(false);
		}
	};

	// const checkAuthUser = async () => {
	// 	setIsLoading(true);
	// 	try {
	// 		let result = false;
	//
	// 		const currentAccount = await getCurrentUser();
	// 		console.log(currentAccount, "currentAccount from AuthProvider");
	//
	// 		if (currentAccount) {
	// 			const { $id, name, username, email, imageUrl, bio } = currentAccount;
	// 			setUser({
	// 				id: $id,
	// 				name,
	// 				username,
	// 				email,
	// 				imageUrl,
	// 				bio,
	// 			});
	// 			setIsAuthenticated(true);
	// 			result = true;
	// 		}
	// 		return result;
	// 	} catch (e) {
	// 		console.error("Error checking user authentication:", e);
	// 		return false;
	// 	} finally {
	// 		setIsLoading(false);
	// 	}
	// };
	useEffect(() => {
		const cookieFallback = localStorage.getItem("cookieFallback");
		if (!cookieFallback || cookieFallback === "[]") {
			setIsLoading(false); // Set loading state to false if no cookieFallback
			return navigate("/sign-in");
		}
		checkAuthUser();
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
