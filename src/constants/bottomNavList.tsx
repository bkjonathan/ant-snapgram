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
		to: "/save",
		icon: <SaveOutlined className="text-xl text-white" />,
		label: "Save",
	},
	{
		to: "/create",
		icon: <PlusOutlined className="text-xl text-white" />,
		label: "Create",
	},
];
