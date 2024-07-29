import { Suspense } from "react";
import AuthProvider from "../../providers/AuthProvider.tsx";
import { Outlet } from "react-router-dom";
import TopBar from "../../components/shared/TopBar.tsx";

const AuthLayout = () => {
	return (
		<Suspense>
			<AuthProvider>
				<div className={"md-[160px] w-full md:mb-0 md:flex"}>
					<TopBar />
					<section className="flex h-screen flex-1">
						<Outlet />
					</section>
				</div>
			</AuthProvider>
		</Suspense>
	);
};

export default AuthLayout;
