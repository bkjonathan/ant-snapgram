import { Outlet } from "react-router-dom";

const GuestLayout = () => {
	return (
		<>
			<section className="flex flex-1 flex-col items-center justify-center py-10">
				<Outlet />
			</section>
		</>
	);
};

export default GuestLayout;
