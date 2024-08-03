import { Loader, PostCard } from "@/components";
import { useGetCurrentUser } from "@/queries";
import { Models } from "appwrite";

const SavePage = () => {
	const {
		data: currentUser,
		isPending: isPostLoading,
		isError: isErrorPosts,
	} = useGetCurrentUser();

	console.log(currentUser);
	if (isErrorPosts) {
		return (
			<div className="flex flex-1">
				<div className="home-container">
					<p className="body-medium text-light-1">Something bad happened</p>
				</div>
			</div>
		);
	}
	return (
		<div className="flex flex-1">
			<div className="home-container">
				<div className="home-posts">
					<h2 className="h3-bold md:h2-bold w-full text-left">Home Feed</h2>
					{isPostLoading && !currentUser ? (
						<Loader />
					) : (
						<div className="flex-center h-full w-full">
							<ul className="flex w-full flex-1 flex-col gap-9">
								{currentUser?.saves?.map((user: Models.Document) => {
									if (user.post) {
										user.post = {
											...user.post,
											creator: user,
											likes: [],
										};
									}
									return (
										<li
											key={user.post.$id}
											className="flex w-full justify-center">
											{/*{JSON.stringify(user.post)}*/}
											<PostCard post={user.post} />
										</li>
									);
								})}
							</ul>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default SavePage;
