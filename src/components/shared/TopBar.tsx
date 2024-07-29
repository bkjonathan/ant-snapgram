import { FC } from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";

const TopBar: FC = () => {
	return (
		<section className={"sticky top-0 z-50 w-full bg-dark-2 md:hidden"}>
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
					<Button className={"border-none bg-dark-3"}>
						<img
							src="/assets/icons/logout.svg"
							alt="plus"
							width={20}
							height={20}
						/>
					</Button>

					<Link to={`/profile/id}`} className="flex-center">
						<img
							src="/assets/images/profile.png"
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
