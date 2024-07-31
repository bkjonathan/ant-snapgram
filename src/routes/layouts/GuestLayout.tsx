import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks";
import { Loader } from "@/components";

const GuestLayout = () => {
	const { isAuthenticated, isLoading } = useAuth();
	if (isLoading) {
		return <Loader />; // Show loader while checking authentication
	}

	return (
		<>
			{isAuthenticated ? (
				<Navigate to="/" />
			) : (
				<>
					<section className="flex flex-1 flex-col items-center justify-center py-10">
						<Outlet />
					</section>
					<img
						src="/assets/images/side-img.webp"
						alt="logo"
						className="hidden h-screen w-1/2 bg-no-repeat object-cover xl:block"
					/>
				</>
			)}
		</>
	);
};

export default GuestLayout;
