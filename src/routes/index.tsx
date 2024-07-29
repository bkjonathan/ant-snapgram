import { RouteObject } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout.tsx";
import GuestLayout from "./layouts/GuestLayout.tsx";
import SignInPage from "./pages/guest/SignInPage.tsx";
import SignUpPage from "./pages/guest/SignUpPage.tsx";
import HomePage from "./pages/auth/HomePage.tsx";

const routes: RouteObject[] = [
	{
		path: "",
		element: <AuthLayout />,
		children: [
			{
				path: "/",
				element: <HomePage />,
			},
		],
	},
	{
		path: "",
		element: <GuestLayout />,
		children: [
			{
				path: "/sign-in",
				element: <SignInPage />,
			},
			{
				path: "/sign-up",
				element: <SignUpPage />,
			},
		],
	},
];

export default routes;
