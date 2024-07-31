import { Outlet } from "react-router-dom";
import { BottomBar, TopBar } from "@/components";

const AuthLayout = () => {
	return (
		<div className={"w-full md:flex"}>
			<TopBar />
			<section className="flex h-screen flex-1 pb-[120px] md:pb-0">
				<Outlet />
			</section>
			<BottomBar />
		</div>
	);
};

export default AuthLayout;
