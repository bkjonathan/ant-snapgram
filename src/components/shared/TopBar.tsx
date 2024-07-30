import { FC, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "antd";
import { useSignOut } from "@/queries/auth.query.ts";
import { useAuth } from "@/hooks";

const TopBar: FC = () => {
	const { mutate: signOut, isSuccess } = useSignOut();
	const navigate = useNavigate();
	const { user } = useAuth();

	useEffect(() => {
		if (isSuccess) {
			navigate(0);
		}
	}, [isSuccess]);

	return (
		<section className={"top-bar"}>
			<div className={"flex items-center justify-between px-5 py-4"}>
				<Link to="/">
					<img
						src="/assets/images/logoWhite.svg"
						width={120}
						height={130}
						alt="logo"
					/>
				</Link>

				<div className={"flex gap-4"}>
					<Button className={"border-none bg-dark-3"} onClick={() => signOut()}>
						<img
							src="/assets/icons/logout.svg"
							alt="plus"
							width={20}
							height={20}
						/>
					</Button>

					<Link to={`/profile/${user.id}`} className="flex-center">
						<img
							src={user.imageUrl || "/assets/images/profile-placeholder.svg"}
							alt="profile"
							className="h-8 w-8 rounded-full"
						/>
					</Link>
				</div>
			</div>
		</section>
	);
};

export default TopBar;
