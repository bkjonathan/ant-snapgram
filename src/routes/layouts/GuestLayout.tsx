import { Outlet } from "react-router-dom";
import { NotificationProvider } from "@/providers";

const GuestLayout = () => {
	return (
		<NotificationProvider>
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
		</NotificationProvider>
	);
};

export default GuestLayout;
