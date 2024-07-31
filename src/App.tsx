import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import GuestLayout from "@/routes/layouts/GuestLayout.tsx";
import AuthLayout from "@/routes/layouts/AuthLayout.tsx";
import HomePage from "@/routes/pages/auth/HomePage.tsx";
import SignInPage from "@/routes/pages/guest/SignInPage.tsx";
import SignUpPage from "@/routes/pages/guest/SignUpPage.tsx";

const App: FC = () => {
	return (
		<main className="flex h-screen">
			<Routes>
				<Route element={<GuestLayout />}>
					<Route path="/sign-in" element={<SignInPage />} />
					<Route path="/sign-up" element={<SignUpPage />} />
				</Route>

				{/* private routes */}
				<Route element={<AuthLayout />}>
					<Route index element={<HomePage />} />
					<Route path="/explore" element={<HomePage />} />
					<Route path="/saved" element={<HomePage />} />
					<Route path="/all-users" element={<HomePage />} />
					<Route path="/create-post" element={<HomePage />} />
					<Route path="/update-post/:id" element={<HomePage />} />
					<Route path="/posts/:id" element={<HomePage />} />
					<Route path="/profile/:id/*" element={<HomePage />} />
					<Route path="/update-profile/:id" element={<HomePage />} />
				</Route>
			</Routes>
		</main>
	);
};

export default App;
