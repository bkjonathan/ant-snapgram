const PostStats = ({ post, userId }: any) => {
	console.log(post);
	console.log(userId);
	return (
		<div className={`flex-between z-20 px-3`}>
			<div className="mr-5 flex gap-2">
				<img
					src={`/assets/icons/like.svg`}
					alt="like"
					width={20}
					height={20}
					className="cursor-pointer"
				/>
				<p className="small-medium lg:base-medium">1</p>
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
