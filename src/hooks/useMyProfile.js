import { useEffect, useState } from "react";
import { sendRequest } from "../api/apiClient";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";

const DEFAULT_AVATAR = process.env.REACT_APP_DEFAULT_AVATAR;

export function useMyProfile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState("");
    const [message, setMessage] = useState("");

    const storedUserRaw =
        localStorage.getItem("userLogin") ||
        localStorage.getItem("user");

    const storedUser = storedUserRaw
        ? JSON.parse(storedUserRaw)
        : null;

    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (!storedUser?.username) {
                    throw new Error("Sesión no válida");
                }

                const token = localStorage.getItem("token");
                if (!token) throw new Error("Token no encontrado");

                const res = await sendRequest({
                    route: "usersList",
                    token
                });

                if (!res?.success) {
                    throw new Error(res?.error);
                }

                const userInfo = res.users.find(
                    u => u.username === storedUser.username
                );

                if (!userInfo) {
                    throw new Error("Usuario no encontrado");
                }

                setUser({ ...userInfo, role: storedUser.role });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const changePhoto = async (file) => {
        if (!file) return;

        setUploading(true);
        setPreview(URL.createObjectURL(file));
        setMessage("");

        try {
            const photoUrl = await uploadToCloudinary(file);
            const token = localStorage.getItem("token");

            const res = await sendRequest({
                route: "updatePhoto",
                token,
                photoUrl
            });

            if (!res?.success) {
                throw new Error(res?.error);
            }

            setUser(prev => ({ ...prev, photoUrl }));
            localStorage.setItem(
                "userLogin",
                JSON.stringify({ ...storedUser, photoUrl })
            );

            setMessage("Foto actualizada correctamente ✅");
        } catch (err) {
            setPreview("");
            throw err;
        } finally {
            setUploading(false);
        }
    };

    return {
        user,
        loading,
        error,
        uploading,
        preview,
        message,
        changePhoto,
        DEFAULT_AVATAR
    };
}
