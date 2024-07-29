import { FC } from "react";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";

type FieldType = {
	email?: string;
	password?: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
	console.log("Success:", values);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
	console.log("Failed:", errorInfo);
};

const SignInPage: FC = () => {
	return (
		<>
			<img src="/assets/images/logoBlack.svg" alt="logo" />
			<h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
				Sign in to your account
			</h2>
			<p className="small-medium md:base-regular mb-6 text-light-3">
				Welcome back! Please enter your details
			</p>
			<Form
				name="basic"
				labelCol={{ span: 24 }}
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				className={"max-w-3xl"}
				autoComplete="off">
				<Form.Item<FieldType>
					label="Email"
					name="email"
					rules={[{ required: true, message: "Please input your email!" }]}>
					<Input
						className="cool-input"
						type="email"
						placeholder="Email Address"
						autoComplete="off"
					/>
				</Form.Item>

				<Form.Item<FieldType>
					label="Password"
					name="password"
					rules={[{ required: true, message: "Please input your password!" }]}>
					<Input.Password
						className="cool-input"
						placeholder="Enter Password"
						autoComplete="off"
					/>
				</Form.Item>

				<Form.Item className={"text-center"}>
					<Button
						type="primary"
						htmlType="submit"
						className={"h-[40px] w-full"}>
						Sign In
					</Button>
				</Form.Item>

				<p className="text-small-regular mt-2 text-center text-light-3">
					Don't have an account?{" "}
					<Link
						to="/sign-up"
						className="text-small-semibold ml-1 text-primary-500">
						Sign up
					</Link>
				</p>
			</Form>
		</>
	);
};

export default SignInPage;
