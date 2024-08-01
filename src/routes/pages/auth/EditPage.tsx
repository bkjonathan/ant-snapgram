import { FC } from "react";
import { useParams } from "react-router-dom";
import { useGetPostById } from "@/queries/post.query.ts";
import { Loader, PostForm } from "@/components";

const EditPage: FC = () => {
	const { id } = useParams();
	const { data: post, isPending } = useGetPostById(id);

	if (isPending) {
		return (
			<div className="flex-center h-full w-full">
				<Loader />
			</div>
		);
	}
	return (
		<div className="flex flex-1">
			<div className="common-container">
				<div className="flex-start w-full max-w-5xl justify-start gap-3">
					<img
						src="/assets/icons/edit.svg"
						width={36}
						height={36}
						alt="edit"
						className="invert-white"
					/>
					<h2 className="h3-bold md:h2-bold w-full text-left">Edit Post</h2>
				</div>

				{isPending ? <Loader /> : <PostForm action="Update" post={post} />}
			</div>
		</div>
	);
};

export default EditPage;
