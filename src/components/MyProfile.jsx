import { useEffect, useState } from "react";
import { sendRequest } from "../api/apiClient";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";
import { styles } from "../styles/styles";

const DEFAULT_AVATAR = process.env.REACT_APP_DEFAULT_AVATAR;

export default function MyProfile() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState("");
    const [message, setMessage] = useState(""); // ✅ Nuevo estado para mensajes

    const storedUserRaw = localStorage.getItem("userLogin") || localStorage.getItem("user");
    const storedUser = storedUserRaw ? JSON.parse(storedUserRaw) : null;

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

    // ✅ Subir y actualizar foto automáticamente
    const handleFileChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        setPreview(URL.createObjectURL(file));
        setMessage(""); // limpiar mensaje previo

        try {
            // Subir a Cloudinary
            const photoUrl = await uploadToCloudinary(file);

            // Guardar URL en backend
            const token = localStorage.getItem("token");
            const res = await sendRequest({ route: "updatePhoto", token, photoUrl });

            if (!res?.success) throw new Error(res?.error || "Error al actualizar foto");

            // Actualizar estado y localStorage
            setUserData(prev => ({ ...prev, photoUrl }));
            localStorage.setItem("userLogin", JSON.stringify({ ...storedUser, photoUrl }));

            setMessage("Foto actualizada correctamente ✅"); // ✅ Mensaje de éxito
        } catch (err) {
            alert(err.message);
            setPreview("");
        } finally {
            setUploading(false);
        }
    };

    const formatDate = dateString => {
        if (!dateString) return "-";
        const d = new Date(dateString);
        return d.toISOString().split("T")[0];
    };

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
        <div
            style={{
                ...styles.card,
                padding: "25px",
                borderRadius: "12px",
                maxWidth: "450px",
                margin: "20px auto",
                textAlign: "center",
                background: "linear-gradient(60deg, #88bdf7, #FFA500)" // gradiente azul → naranja
            }}
        >
            <img
                src={preview || userData.photoUrl || DEFAULT_AVATAR}
                alt="Perfil"
                onError={e => (e.currentTarget.src = DEFAULT_AVATAR)}
                style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "3px solid #FFA500"
                }}
            />

            <div style={{ margin: "15px 0" }}>
                <label style={uploadButtonStyle}>
                    {uploading ? "Cargando..." : "Cambiar foto"}
                    <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleFileChange}
                    />
                </label>
            </div>

            {message && <p style={{ color: "green" }}>{message}</p>} {/* ✅ Mostrar mensaje */}

            <h2>Mi Perfil</h2>

            <ProfileRow label="Nombre" value={userData.nombre} />
            <ProfileRow label="Apellido" value={userData.apellido} />
            <ProfileRow label="Usuario" value={userData.username} />
            <ProfileRow label="Rol" value={userData.role} />
            <ProfileRow label="Nacimiento" value={formatDate(userData.fechaNacimiento)} />
            <ProfileRow label="Edad" value={calculateAge(userData.fechaNacimiento)} />
        </div>
    );
}

const uploadButtonStyle = {
    cursor: "pointer",
    backgroundColor: "#FFA500",
    color: "#fff",
    padding: "8px 16px",
    borderRadius: "8px",
    display: "inline-block"
};

const ProfileRow = ({ label, value }) => (
    <div
        style={{
            display: "flex",
            justifyContent: "space-between",
            background: "#f9f9f9",
            padding: "10px 15px",
            borderRadius: "8px",
            marginTop: "8px"
        }}
    >
        <strong>{label}</strong>
        <span>{value || "-"}</span>
    </div>
);
