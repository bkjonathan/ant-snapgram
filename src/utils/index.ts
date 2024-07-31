import { NotificationInstance } from "antd/es/notification/interface";

export function formatRelativeTime(dateString: string): string {
	const date = new Date(dateString);
	const now = new Date();
	const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

	const intervals = [
		{ label: "year", seconds: 31536000 },
		{ label: "month", seconds: 2592000 },
		{ label: "day", seconds: 86400 },
		{ label: "hour", seconds: 3600 },
		{ label: "minute", seconds: 60 },
		{ label: "second", seconds: 1 },
	];

	for (const interval of intervals) {
		const count = Math.floor(diffInSeconds / interval.seconds);
		if (count >= 1) {
			return `${count} ${interval.label}${count !== 1 ? "s" : ""} ago`;
		}
	}

	return "just now";
}

export const withErrorHandling = <T, Args extends unknown[]>(
	asyncFunc: (...args: Args) => Promise<T>,
	api: NotificationInstance | null,
): ((...args: Args) => Promise<T | void>) => {
	return async (...args: Args) => {
		try {
			return await asyncFunc(...args);
		} catch (error) {
			if (error instanceof Error) {
				api?.open({
					message: error.message,
				});
			} else {
				api?.open({
					message: "An unknown error occurred",
				});
			}
		}
	};
};
