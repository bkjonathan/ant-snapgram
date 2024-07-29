import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { useNavigate } from "react-router-dom";

type IAuthContext = {
	isAuthenticated: boolean;
	isLoading: boolean;
};

export const AuthContext = createContext<Partial<IAuthContext>>({
	isAuthenticated: false,
	isLoading: false,
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const checkAuthUser = async () => {
		try {
			setIsLoading(true);
			console.log("Checking user authentication...");
		} catch (e) {
			console.error("Error checking user authentication:", e);
		} finally {
			setIsLoading(false);
		}
	};
	const navigate = useNavigate();
	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			setIsAuthenticated(true);
		} else {
			navigate("/sign-in");
		}
		checkAuthUser();
	}, []);
	return (
		<AuthContext.Provider value={{ isAuthenticated, isLoading }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
