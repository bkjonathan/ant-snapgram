import {
	HomeOutlined,
	PlusOutlined,
	ProductOutlined,
	SaveOutlined,
} from "@ant-design/icons";

export const NAV_LISTS = [
	{
		to: "/",
		icon: <HomeOutlined className="text-xl text-white" />,
		label: "Home",
	},
	{
		to: "/explore",
		icon: <ProductOutlined className="text-xl text-white" />,
		label: "Explore",
	},
	{
		to: "/saved",
		icon: <SaveOutlined className="text-xl text-white" />,
		label: "Save",
	},
	{
		to: "/create-post",
		icon: <PlusOutlined className="text-xl text-white" />,
		label: "Create",
	},
];
