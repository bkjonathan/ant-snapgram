import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks";

const GuestLayout = () => {
	const { isAuthenticated } = useAuth();
	return (
		<>
			{isAuthenticated ? (
				<Navigate to="/" />
			) : (
				<main className="flex h-screen">
					<section className="flex flex-1 flex-col items-center justify-center py-10">
						<Outlet />
					</section>
					<img
						src="/assets/images/side-img.webp"
						alt="logo"
						className="hidden h-screen w-1/2 bg-no-repeat object-cover xl:block"
					/>
				</main>
			)}
		</>
	);
};

export default GuestLayout;
