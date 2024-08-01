import { Models } from "appwrite";
import { useNavigate } from "react-router-dom";
import { useAuth, useNotification } from "@/hooks";
import { Button, Form, FormProps, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import FileUploader from "@/components/shared/FileUploader.tsx";
import { useCreatePost, useUpdatePost } from "@/queries";
import { IUpdatePost } from "@/types";
import { ERROR_CREATE_POST_NOTIFICATION_OPTIONS } from "@/constants";
import { Loader } from "@/components";
import { withErrorHandling } from "@/utils";

type PostFormProps = {
	post?: Models.Document;
	action: "Create" | "Update";
};

const PostForm = ({ post, action }: PostFormProps) => {
	const navigate = useNavigate();
	const { user } = useAuth();
	const [form] = Form.useForm();
	const notification = useNotification();

	const { mutateAsync: createPost, isPending: isPendingCreate } =
		useCreatePost();
	const { mutateAsync: updatePost, isPending: isPendingUpdate } =
		useUpdatePost();
	const initialValues = {
		caption: post ? post.caption : "",
		file: [],
		location: post ? post.location : "",
		tags: post ? post.tags.join(",") : "",
	};

	const handleFinish: FormProps<IUpdatePost>["onFinish"] = withErrorHandling(
		async (values) => {
			if (post && action === "Update") {
				await updatePost({
					...values,
					postId: post.$id,
					imageId: post.imageId,
					imageUrl: post.imageUrl,
				});

				return navigate(`/posts/${post.$id}`);
			}
			const newPost = await createPost({
				...values,
				userId: user?.id,
			});

			if (!newPost) {
				return notification?.open(ERROR_CREATE_POST_NOTIFICATION_OPTIONS);
			}
			navigate("/");
		},
		notification,
	);

	const fileChange = (files: File[]) => {
		console.log("files", files);
		form.setFieldsValue({ file: files });
	};
	return (
		<Form
			form={form}
			initialValues={initialValues}
			onFinish={handleFinish}
			className={"w-full max-w-5xl"}
			layout="vertical"
			requiredMark={false}>
			<Form.Item
				name="caption"
				label="Caption"
				rules={[{ required: true, message: "Please enter a caption" }]}>
				<TextArea className="cool-input custom-scrollbar" />
			</Form.Item>

			<Form.Item
				name="file"
				label="File"
				valuePropName="fileList"
				getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}>
				<FileUploader fieldChange={fileChange} mediaUrl={post?.imageUrl} />
				{/*<Upload name="file" listType="picture" beforeUpload={() => false}>*/}
				{/*	<Button icon={<UploadOutlined />}>Upload</Button>*/}
				{/*</Upload>*/}
			</Form.Item>

			<Form.Item
				name="location"
				label="Location"
				rules={[{ required: true, message: "Please enter a location" }]}>
				<Input className={"cool-input"} />
			</Form.Item>

			<Form.Item
				name="tags"
				label="Tags"
				rules={[{ required: true, message: "Please enter tags" }]}>
				<Input className={"cool-input"} />
			</Form.Item>

			<Form.Item>
				<Button
					type="primary"
					className={"w-full p-6"}
					htmlType="submit"
					disabled={isPendingCreate || isPendingUpdate}>
					<div className={"flex gap-3"}>
						{(isPendingCreate || isPendingUpdate) && <Loader />}
						{action} Post
					</div>
				</Button>
			</Form.Item>
		</Form>
	);
};

export default PostForm;
