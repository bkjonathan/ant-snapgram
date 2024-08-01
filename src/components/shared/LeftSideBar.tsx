import { cloneElement, FC, MouseEvent } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks";
import { useSignOut } from "@/queries";
import { INIT_USER, NAV_LISTS } from "@/constants";
import { Loader } from "@/components";
import { Button } from "antd";

const LeftSideBar: FC = () => {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const { user, setUser, setIsAuthenticated, isLoading } = useAuth();

	const { mutate: signOut } = useSignOut();

	const handleSignOut = async (e: unknown) => {
		(e as MouseEvent<HTMLElement, MouseEvent>).preventDefault();
		signOut();
		setIsAuthenticated(false);
		setUser(INIT_USER);
		navigate("/sign-in");
	};

	return (
		<nav className="leftsidebar">
			<div className="flex flex-col gap-11">
				<Link to="/" className="flex items-center gap-3">
					<img
						src="/assets/images/logoBlack.svg"
						alt="logo"
						width={170}
						height={36}
					/>
				</Link>

				{isLoading || !user.email ? (
					<div className="h-14">
						<Loader />
					</div>
				) : (
					<Link to={`/profile/${user.id}`} className="flex items-center gap-3">
						<img
							src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
							alt="profile"
							className="h-14 w-14 rounded-full"
						/>
						<div className="flex flex-col">
							<p className="body-bold">{user.name}</p>
							<p className="small-regular text-light-3">@{user.username}</p>
						</div>
					</Link>
				)}

				<ul className="flex flex-col gap-6">
					{NAV_LISTS.map((link) => {
						const isActive = pathname === link.to;

						return (
							<li
								key={link.label}
								className={`leftsidebar-link group ${
									isActive && "bg-primary-500 text-white"
								}`}>
								<NavLink to={link.to} className="flex items-center gap-4 p-4">
									{cloneElement(link.icon, {
										className: `${link.icon} ${isActive ? "text-xl  text-white" : "text-xl text-dark-4"}`,
									})}
									<p className={isActive ? `ext-white` : "text-dark-4"}>
										{link.label}
									</p>
								</NavLink>
							</li>
						);
					})}
				</ul>
			</div>

			<Button
				className="rounded-2xl rounded-lg bg-dark-3 p-6 text-white"
				onClick={(e) => handleSignOut(e)}>
				<img src="/assets/icons/logout.svg" alt="logout" />
				<p className="small-medium lg:base-medium">Logout</p>
			</Button>
		</nav>
	);
};

export default LeftSideBar;
