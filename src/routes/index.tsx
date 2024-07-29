import { RouteObject } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout.tsx";
import GuestLayout from "./layouts/GuestLayout.tsx";

const routes: RouteObject[] = [
	{
		path: "",
		element: <AuthLayout />,
		children: [
			{
				path: "/",
				element: <div>Home</div>,
			},
		],
	},
	{
		path: "",
		element: <GuestLayout />,
		children: [
			{
				path: "/sign-in",
				element: <div>Sign In</div>,
			},
		],
	},
];

export default routes;
