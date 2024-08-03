import { Loader, PostCard, UserCard } from "@/components";
import { useGetRecentPosts } from "@/queries";
import { useGetUsers } from "@/queries/auth.query.ts";

const HomePage = () => {
	const {
		data: posts,
		isLoading: isPostLoading,
		isError: isErrorPosts,
	} = useGetRecentPosts();

	const {
		data: creators,
		isLoading: isUserLoading,
		isError: isErrorCreators,
	} = useGetUsers(10);

	console.log(creators, "from creator");
	if (isErrorPosts || isErrorCreators) {
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
					{isPostLoading ? (
						<Loader />
					) : (
						<div className="flex-center h-full w-full">
							<ul className="flex w-full flex-1 flex-col gap-9">
								{posts?.documents.map((post) => (
									<li key={post.$id} className="flex w-full justify-center">
										<PostCard post={post} />
									</li>
								))}
							</ul>
						</div>
					)}
				</div>
			</div>

			<div className="home-creators">
				<h3 className="h3-bold mt-5">Top Creators</h3>
				{isUserLoading && !creators ? (
					<Loader />
				) : (
					<ul className="grid gap-6 2xl:grid-cols-2">
						{creators?.documents.map((creator) => (
							<li key={creator?.$id}>
								<UserCard user={creator} />
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};

export default HomePage;
