//Maneja toda la lógica de autenticación:
//Login
//Logout
//Usuario en sesión
//Mensajes y errores
import { useState } from "react";
import { sendRequest } from "../api/apiClient";

export const useAuth = () => {
    // Usuario persistido en localStorage
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user"))
    );

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    // ============================
    // LOGIN
    // ============================
    const login = async (username, password) => {
        setError("");

        const data = await sendRequest({
            route: "login",
            username,
            password
        });

        if (!data.success) throw new Error(data.error);

        // Persistimos sesión
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        setUser(data.user);
    };

    // ============================
    // LOGOUT
    // ============================
    const logout = () => {
        localStorage.clear();
        setUser(null);
    };

    return {
        user,
        setUser,
        login,
        logout,
        error,
        setError,
        message,
        setMessage
    };
};
