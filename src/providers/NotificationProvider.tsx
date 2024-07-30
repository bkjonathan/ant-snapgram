import { createContext, ReactNode, useContext } from "react";
import { notification } from "antd";
import { NotificationInstance } from "antd/es/notification/interface";

const NotificationContext = createContext<NotificationInstance | null>(null);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
	const [api, contextHolder] = notification.useNotification();

	return (
		<NotificationContext.Provider value={api}>
			{children}
			{contextHolder}
		</NotificationContext.Provider>
	);
};

export const useNotification = () => useContext(NotificationContext);
