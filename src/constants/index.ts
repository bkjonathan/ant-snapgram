import { INIT_USER, AUTH_INIT_STATE } from "./authConst.ts";
import { mockPosts } from "./mockPosts.ts";
import { ArgsProps } from "antd/es/notification";

export { mockPosts, INIT_USER, AUTH_INIT_STATE };

export const SIGN_UP_NOTIFICATION_OPTIONS: ArgsProps = {
	message: "Please try again",
	description: "Sign up failed",
	placement: "topRight",
	type: "error",
};

export const SIGN_IN_NOTIFICATION_OPTIONS: ArgsProps = {
	message: "Welcome to Snapgram!",
	placement: "topRight",
	type: "success",
};
