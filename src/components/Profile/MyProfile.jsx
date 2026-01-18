import { useEffect, useState } from "react";
import { sendRequest } from "../../api/apiClient";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";
import { myProfileStyles } from "../../styles/Home/profile/myProfileStyles";

const DEFAULT_AVATAR = process.env.REACT_APP_DEFAULT_AVATAR;

export default function MyProfile() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState("");
    const [message, setMessage] = useState("");
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 360);

    const storedUserRaw = localStorage.getItem("userLogin") || localStorage.getItem("user");
    const storedUser = storedUserRaw ? JSON.parse(storedUserRaw) : null;

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 360);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            if (!storedUser?.username) {
                setError("Sesión no válida. Inicia sesión nuevamente.");
                setLoading(false);
                return;
            }

            try {
                const token = localStorage.getItem("token");
                if (!token) throw new Error("Token no encontrado");

                const res = await sendRequest({ route: "usersList", token });

                if (!res?.success) throw new Error(res?.error || "Error al cargar usuario");

                const userInfo = res.users?.find(u => u.username === storedUser.username);
                if (!userInfo) throw new Error("Usuario no encontrado");

                setUserData({ ...userInfo, role: storedUser.role });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleFileChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        setPreview(URL.createObjectURL(file));
        setMessage("");

        try {
            const photoUrl = await uploadToCloudinary(file);
            const token = localStorage.getItem("token");
            const res = await sendRequest({ route: "updatePhoto", token, photoUrl });

            if (!res?.success) throw new Error(res?.error || "Error al actualizar foto");

            setUserData(prev => ({ ...prev, photoUrl }));
            localStorage.setItem("userLogin", JSON.stringify({ ...storedUser, photoUrl }));

            setMessage("Foto actualizada correctamente ✅");
        } catch (err) {
            alert(err.message);
            setPreview("");
        } finally {
            setUploading(false);
        }
    };

    const formatDate = dateString => dateString ? new Date(dateString).toISOString().split("T")[0] : "-";
    const calculateAge = dateString => {
        if (!dateString) return "-";
        const today = new Date();
        const birth = new Date(dateString);
        let age = today.getFullYear() - birth.getFullYear();
        const m = today.getMonth() - birth.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
        return age;
    };

    if (loading) return <p>Cargando información...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!userData) return <p>No se encontró información</p>;

    return (
        <div style={isMobile
            ? { ...myProfileStyles.card, ...myProfileStyles.mobile.card }
            : myProfileStyles.card
        }>
            <img
                src={preview || userData.photoUrl || DEFAULT_AVATAR}
                alt="Perfil"
                onError={e => (e.currentTarget.src = DEFAULT_AVATAR)}
                style={isMobile
                    ? { ...myProfileStyles.avatar, ...myProfileStyles.mobile.avatar }
                    : myProfileStyles.avatar
                }
            />

            <label style={isMobile
                ? { ...myProfileStyles.uploadButton, ...myProfileStyles.mobile.uploadButton }
                : myProfileStyles.uploadButton
            }>
                {uploading ? "Cargando..." : "Cambiar foto"}
                <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleFileChange}
                />
            </label>

            {message && <p style={{ color: "green" }}>{message}</p>}

            <h2>Mi Perfil</h2>

            <ProfileRow label="Nombre" value={userData.nombre} isMobile={isMobile} />
            <ProfileRow label="Apellido" value={userData.apellido} isMobile={isMobile} />
            <ProfileRow label="Usuario" value={userData.username} isMobile={isMobile} />
            <ProfileRow label="Rol" value={userData.role} isMobile={isMobile} />
            <ProfileRow label="Nacimiento" value={formatDate(userData.fechaNacimiento)} isMobile={isMobile} />
            <ProfileRow label="Edad" value={calculateAge(userData.fechaNacimiento)} isMobile={isMobile} />
        </div>
    );
}

const ProfileRow = ({ label, value, isMobile }) => (
    <div style={isMobile
        ? { ...myProfileStyles.row, ...myProfileStyles.mobile.row }
        : myProfileStyles.row
    }>
        <strong>{label}</strong>
        <span>{value || "-"}</span>
    </div>
);
