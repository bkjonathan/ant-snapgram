import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { client } from "./queries/client.ts";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider, NotificationProvider } from "@/providers";
import App from "@/App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<BrowserRouter>
			<QueryClientProvider client={client}>
				<AuthProvider>
					<NotificationProvider>
						<App />
					</NotificationProvider>
				</AuthProvider>
			</QueryClientProvider>
		</BrowserRouter>
	</React.StrictMode>,
);
