import { Models } from "appwrite";
import { Link } from "react-router-dom";
import { Button } from "antd";

type UserCardProps = {
	user: Models.Document;
};

const UserCard = ({ user }: UserCardProps) => {
	return (
		<Link to={`/profile/${user.$id}`} className="user-card">
			<img
				src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
				alt="creator"
				className="h-14 w-14 rounded-full"
			/>

			<div className="flex-center flex-col gap-1">
				<p className="base-medium line-clamp-1 text-center">{user.name}</p>
				<p className="small-regular line-clamp-1 text-center text-light-3">
					@{user.username}
				</p>
			</div>

			<Button className="shad-button_primary px-5">Follow</Button>
		</Link>
	);
};

export default UserCard;
