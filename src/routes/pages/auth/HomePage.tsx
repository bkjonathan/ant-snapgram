import PostCard from "../../../components/shared/PostCard.tsx";
import { mockPosts } from "../../../constants";

const HomePage = () => {
	return (
		<div className="flex flex-1">
			<div className="home-container">
				<div className="home-posts">
					<h2 className="h3-bold md:h2-bold w-full text-left">Home Feed</h2>
					<div className="flex-center h-full w-full">
						<ul className="flex w-full flex-1 flex-col gap-9">
							{mockPosts.map((post) => (
								<li key={post.$id} className="flex w-full justify-center">
									<PostCard post={post} />
								</li>
							))}
							{/*<li className="flex w-full justify-center">*/}
							{/*	<PostCard post={mockPost} />*/}
							{/*</li>*/}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
