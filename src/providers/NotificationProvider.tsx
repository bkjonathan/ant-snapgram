import { createContext, ReactNode } from "react";
import { notification } from "antd";
import { NotificationInstance } from "antd/es/notification/interface";

export const NotificationContext = createContext<NotificationInstance | null>(
	null,
);

const NotificationProvider = ({ children }: { children: ReactNode }) => {
	const [api, contextHolder] = notification.useNotification();

	return (
		<NotificationContext.Provider value={api}>
			{children}
			{contextHolder}
		</NotificationContext.Provider>
	);
};

export default NotificationProvider;
