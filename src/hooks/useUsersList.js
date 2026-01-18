import { useEffect, useState } from "react";
import { sendRequest } from "../api/apiClient";

export function useUsersList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await sendRequest({ route: "usersList" });
            if (!res?.success) throw new Error(res?.error);

            setUsers(
                res.users.map(u => ({
                    ...u,
                    activo: u.activo === true || u.activo === "TRUE"
                }))
            );
        } catch (err) {
            setError(err.message || "Error al cargar usuarios");
        } finally {
            setLoading(false);
        }
    };

    const toggleUser = async (username, activate) => {
        const token = localStorage.getItem("token");
        const route = activate ? "activateUser" : "deleteUser";

        const res = await sendRequest({ route, username, token });
        if (!res?.success) throw new Error(res?.error);

        setUsers(prev =>
            prev.map(u =>
                u.username === username
                    ? { ...u, activo: activate }
                    : u
            )
        );
    };

    return {
        users,
        loading,
        error,
        toggleUser,
        refresh: fetchUsers
    };
}
