import { FC, MouseEvent, useState } from "react";
import { useLocation } from "react-router-dom";
import { Models } from "appwrite";
import { useLikePost } from "@/queries/post.query.ts";

type PostStatsProps = {
	post: Models.Document;
	userId: string;
};
const PostStats: FC<PostStatsProps> = ({ post, userId }) => {
	const location = useLocation();
	const likesList = post.likes.map((user: Models.Document) => user.$id);

	const [likes, setLikes] = useState<string[]>(likesList);

	const { mutate: likePost } = useLikePost();
	const checkIsLiked = (likeList: string[], userId: string) => {
		return likeList.includes(userId);
	};

	function handleLikePost(e: MouseEvent<HTMLImageElement>) {
		e.stopPropagation();
		let likesArray = [...likes];
		if (likesArray.includes(userId)) {
			likesArray = likesArray.filter((Id) => Id !== userId);
		} else {
			likesArray.push(userId);
		}
		setLikes(likesArray);
		likePost({ postId: post.$id, likesArray });
	}

	const containerStyles = location.pathname.startsWith("/profile")
		? "w-full"
		: "";

	return (
		<div className={`flex-between z-20 px-2 ${containerStyles} `}>
			<div className="mr-5 flex gap-2">
				<img
					src={
						checkIsLiked(likes, userId)
							? "/assets/icons/liked.svg"
							: "/assets/icons/like.svg"
					}
					alt="like"
					width={20}
					height={20}
					onClick={(e) => handleLikePost(e)}
					className="cursor-pointer"
				/>
				<p className="small-medium lg:base-medium">{likes.length}</p>
			</div>

			<div className="flex gap-2">
				<img
					src="/assets/icons/saved.svg"
					alt="share"
					width={20}
					height={20}
					className="cursor-pointer"
				/>
			</div>
		</div>
	);
};

export default PostStats;
