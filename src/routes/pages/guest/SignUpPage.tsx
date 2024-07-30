import { FC } from "react";
import { Button, Form, FormProps, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useCreateUser, useSignIn } from "../../../queries";
import { INewUser } from "../../../types";
import { useNotification } from "../../../providers";
import {
	SIGN_IN_NOTIFICATION_OPTIONS,
	SIGN_UP_NOTIFICATION_OPTIONS,
} from "../../../constants";
import { useAuth } from "../../../providers/AuthProvider.tsx";
import { Loader } from "../../../components";

const onFinishFailed: FormProps<INewUser>["onFinishFailed"] = (errorInfo) => {
	console.log("Failed:", errorInfo);
};

const SignUpPage: FC = () => {
	const { mutateAsync: createUser, isPending: isCreating } = useCreateUser();
	const { mutateAsync: signIn, isPending: isSignIn } = useSignIn();
	const navigate = useNavigate();
	const [form] = Form.useForm();

	const { checkAuthUser } = useAuth();
	const api = useNotification();

	const onFinish: FormProps<INewUser>["onFinish"] = async (
		values: INewUser,
	) => {
		const newUser = await createUser(values);
		if (!newUser) {
			return api?.open(SIGN_UP_NOTIFICATION_OPTIONS);
		}

		const session = await signIn({
			email: values.email,
			password: values.password,
		});
		if (!session) {
			return api?.open(SIGN_UP_NOTIFICATION_OPTIONS);
		}

		const isLoggedIn = await checkAuthUser();
		console.log("isLoggedIn", isLoggedIn);
		if (isLoggedIn) {
			console.log("isLoggedIn", isLoggedIn);
			form.resetFields();
			navigate("/");
			return api?.open(SIGN_IN_NOTIFICATION_OPTIONS);
		}
	};

	return (
		<>
			<img src="/assets/images/logoBlack.svg" alt="logo" />
			<h2 className="h3-bold md:h2-bold pt-3 sm:pt-12">Create a new account</h2>
			<p className="small-medium md:base-regular mb-6 text-light-3">
				To use Snapgram, please enter your details
			</p>
			<Form
				form={form}
				name="basic"
				labelCol={{ span: 24 }}
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				className={"max-w-3xl"}
				autoComplete="off">
				<Form.Item<INewUser>
					label="Name"
					name="name"
					rules={[{ required: true, message: "Please input your name!" }]}>
					<Input
						className="cool-input"
						placeholder="Display Name"
						autoComplete="off"
					/>
				</Form.Item>

				<Form.Item<INewUser>
					label="Username"
					name="username"
					rules={[{ required: true, message: "Please input your username!" }]}>
					<Input
						className="cool-input"
						placeholder="User Name"
						autoComplete="off"
						type="text"
					/>
				</Form.Item>

				<Form.Item<INewUser>
					label="Email Address"
					name="email"
					rules={[{ required: true, message: "Please input your email!" }]}>
					<Input
						className="cool-input"
						placeholder="Email Address"
						autoComplete="off"
						type="email"
					/>
				</Form.Item>

				<Form.Item<INewUser>
					label="Password"
					name="password"
					rules={[{ required: true, message: "Please input your password!" }]}>
					<Input.Password
						className="cool-input"
						placeholder="Enter Password"
						autoComplete="off"
					/>
				</Form.Item>

				<Form.Item className={"pt-3 text-center"}>
					<Button
						type="primary"
						htmlType="submit"
						className={"h-[40px] w-full"}>
						{isCreating || isSignIn ? (
							<div className="flex-center gap-2">
								<Loader />
							</div>
						) : (
							"Sign Up"
						)}
					</Button>
				</Form.Item>

				<p className="text-small-regular mt-2 text-center text-light-3">
					Don't have an account?{" "}
					<Link
						to="/sign-in"
						className="text-small-semibold ml-1 text-primary-500">
						Sign in
					</Link>
				</p>
			</Form>
		</>
	);
};

export default SignUpPage;
