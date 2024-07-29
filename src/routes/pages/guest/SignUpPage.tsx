import { FC } from "react";
import { Button, Form, FormProps, Input } from "antd";
import { Link } from "react-router-dom";

type FieldType = {
	name?: string;
	username?: string;
	email?: string;
	password?: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
	console.log("Success:", values);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
	console.log("Failed:", errorInfo);
};

const SignUpPage: FC = () => {
	return (
		<>
			<img src="/assets/images/logoBlack.svg" alt="logo" />
			<h2 className="h3-bold md:h2-bold pt-3 sm:pt-12">Create a new account</h2>
			<p className="text-light-3 small-medium md:base-regular mb-6">
				To use Snapgram, please enter your details
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
					label="Name"
					name="name"
					rules={[{ required: true, message: "Please input your name!" }]}>
					<Input />
				</Form.Item>

				<Form.Item<FieldType>
					label="Username"
					name="username"
					rules={[{ required: true, message: "Please input your username!" }]}>
					<Input />
				</Form.Item>

				<Form.Item<FieldType>
					label="Email Address"
					name="email"
					rules={[{ required: true, message: "Please input your email!" }]}>
					<Input type="email" />
				</Form.Item>

				<Form.Item<FieldType>
					label="Password"
					name="password"
					rules={[{ required: true, message: "Please input your password!" }]}>
					<Input.Password />
				</Form.Item>

				<Form.Item className={"pt-3 text-center"}>
					<Button type="primary" htmlType="submit" className={"w-full"}>
						Sign Up
					</Button>
				</Form.Item>

				<p className="text-small-regular text-light-3 mt-2 text-center">
					Don't have an account?{" "}
					<Link
						to="/sign-in"
						className="text-primary-500 text-small-semibold ml-1">
						Sign in
					</Link>
				</p>
			</Form>
		</>
	);
};

export default SignUpPage;
