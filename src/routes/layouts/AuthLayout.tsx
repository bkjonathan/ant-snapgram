import { Suspense } from "react";
import AuthProvider from "../../providers/AuthProvider.tsx";
import { Outlet } from "react-router-dom";
import TopBar from "../../components/shared/TopBar.tsx";
import BottomBar from "../../components/shared/BottomBar.tsx";

const AuthLayout = () => {
	return (
		<Suspense>
			<AuthProvider>
				<div className={"md-[160px] w-full md:mb-0 md:flex"}>
					<TopBar />
					<section className="flex h-screen flex-1 pb-[120px] md:pb-0">
						<Outlet />
					</section>
					<BottomBar />
				</div>
			</AuthProvider>
		</Suspense>
	);
};

export default AuthLayout;
