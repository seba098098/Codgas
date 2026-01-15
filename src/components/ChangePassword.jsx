import { useState } from "react";
import { sendRequest } from "../api/apiClient";

export default function ChangePassword() {
    const [oldPass, setOldPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const submit = async (e) => {
        e.preventDefault();
        setMessage("");

        // Validaciones
        if (!oldPass || !newPass || !confirmPass) {
            setMessage("Todos los campos son obligatorios");
            return;
        }

        if (newPass.length < 6) {
            setMessage("La nueva contraseña debe tener al menos 6 caracteres");
            return;
        }

        if (newPass !== confirmPass) {
            setMessage("La nueva contraseña y confirmación no coinciden");
            return;
        }

        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const res = await sendRequest({
                route: "changePassword",
                token,
                oldPassword: oldPass,
                newPassword: newPass
            });

            if (!res.success) {
                setMessage(res.error || "No se pudo cambiar la contraseña");
                return;
            }

            setOldPass("");
            setNewPass("");
            setConfirmPass("");
            setMessage("Contraseña actualizada correctamente ✅");
        } catch (err) {
            setMessage("Error al conectar con el servidor");
        } finally {
            setLoading(false);
        }
    };

    // Estilos elegantes
    const inputStyle = {
        width: "95%",
        padding: "12px 10px",
        borderRadius: "5px",
        border: "0.5px solid #ccc",
        outline: "none",
        fontSize: "14px",
        transition: "0.2s",
    };

    const inputFocusStyle = {
        borderColor: "#88bdf7",
        boxShadow: "0 0 8px rgba(136, 189, 247, 0.3)"
    };

    const buttonStyle = {
        width: "100%",
        padding: "12px",
        borderRadius: "8px",
        border: "none",
        fontSize: "16px",
        color: "white",
        cursor: "pointer",
        background: "linear-gradient(60deg, #88bdf7, #FFA500)",
        transition: "0.3s",
    };

    const buttonHover = (e) => {
        e.currentTarget.style.opacity = "0.9";
    };

    const buttonLeave = (e) => {
        e.currentTarget.style.opacity = "1";
    };

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            minHeight: "100%",
        }}>
            <form
                onSubmit={submit}
                style={{
                    width: "350px",
                    backgroundColor: "#fff",
                    padding: "25px",
                    borderRadius: "12px",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                }}
            >
                <h2 style={{ textAlign: "center", marginBottom: "10px", color: "#333" }}>
                    Cambiar contraseña
                </h2>

                <input
                    type="password"
                    placeholder="Contraseña actual"
                    value={oldPass}
                    onChange={(e) => setOldPass(e.target.value)}
                    style={inputStyle}
                    onFocus={e => Object.assign(e.currentTarget.style, inputFocusStyle)}
                    onBlur={e => Object.assign(e.currentTarget.style, inputStyle)}
                />

                <input
                    type="password"
                    placeholder="Nueva contraseña"
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    style={inputStyle}
                    onFocus={e => Object.assign(e.currentTarget.style, inputFocusStyle)}
                    onBlur={e => Object.assign(e.currentTarget.style, inputStyle)}
                />

                <input
                    type="password"
                    placeholder="Confirmar nueva contraseña"
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    style={inputStyle}
                    onFocus={e => Object.assign(e.currentTarget.style, inputFocusStyle)}
                    onBlur={e => Object.assign(e.currentTarget.style, inputStyle)}
                />

                <button
                    type="submit"
                    style={buttonStyle}
                    onMouseEnter={buttonHover}
                    onMouseLeave={buttonLeave}
                    disabled={loading}
                >
                    {loading ? "Actualizando..." : "Cambiar contraseña"}
                </button>

                {message && (
                    <p style={{
                        textAlign: "center",
                        color: message.includes("✅") ? "green" : "red",
                        fontWeight: "500"
                    }}>
                        {message}
                    </p>
                )}
            </form>
        </div>
    );
}
