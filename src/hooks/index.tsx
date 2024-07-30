import { useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider.tsx";
import { NotificationContext } from "@/providers/NotificationProvider.tsx";

export const useAuth = () => useContext(AuthContext);
export const useNotification = () => useContext(NotificationContext);
