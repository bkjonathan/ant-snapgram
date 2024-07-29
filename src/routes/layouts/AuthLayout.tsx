import { Suspense } from "react";
import AuthProvider from "../../providers/AuthProvider.tsx";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
	return (
		<Suspense>
			<AuthProvider>
				<main>
					<Outlet />
				</main>
			</AuthProvider>
		</Suspense>
	);
};

export default AuthLayout;
