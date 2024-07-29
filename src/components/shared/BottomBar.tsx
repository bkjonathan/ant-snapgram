import { Link, useLocation } from "react-router-dom";
import { NAV_LISTS } from "../../constants/bottomNavList.tsx";

const BottomBar = () => {
	const { pathname } = useLocation();

	return (
		<section className={"bottom-bar"}>
			{NAV_LISTS.map((link, index) => {
				const isActive: boolean = pathname === link.to;
				return (
					<Link
						key={index}
						to={link.to}
						className={`flex-center flex-col gap-1 rounded-[10px] p-2 transition ${isActive ? "w-[60px] bg-primary-500" : ""}`}>
						{link.icon}
						<p className="tiny-medium text-white">{link.label}</p>
					</Link>
				);
			})}
		</section>
	);
};

export default BottomBar;
