import { mockPosts } from "@/constants";
import { Loader, PostCard } from "@/components";
import { useEffect, useState } from "react";

const HomePage = () => {
	const [isPostLoading, setIsPostLoading] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsPostLoading(false);
		}, 2000);

		return () => clearTimeout(timer);
	}, []);
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
								{mockPosts.map((post) => (
									<li key={post.$id} className="flex w-full justify-center">
										<PostCard post={post} />
									</li>
								))}
							</ul>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default HomePage;
