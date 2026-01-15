import React, { useState, useEffect } from "react";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";
import { sendRequest } from "../api/apiClient";
import MyProfile from "./MyProfile";
import ChangePassword from "./ChangePassword";

const DEFAULT_AVATAR = process.env.REACT_APP_DEFAULT_AVATAR;

export default function Profile({ user, onChangePassword }) {
    const [showMenu, setShowMenu] = useState(false);
    const [photo, setPhoto] = useState(user.photoUrl || DEFAULT_AVATAR);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [showChangePassModal, setShowChangePassModal] = useState(false);

    useEffect(() => {
        setPhoto(user.photoUrl || DEFAULT_AVATAR);
    }, [user.photoUrl]);

    const handleChangePhoto = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        setMessage("");
        setPhoto(URL.createObjectURL(file));

        try {
            const photoUrl = await uploadToCloudinary(file);
            const token = localStorage.getItem("token");
            const res = await sendRequest({ route: "updatePhoto", token, photoUrl });

            if (!res?.success) throw new Error(res?.error || "Error al actualizar foto");

            setPhoto(photoUrl);
            localStorage.setItem(
                "userLogin",
                JSON.stringify({ ...user, photoUrl })
            );

            setMessage("Foto actualizada correctamente ✅");
        } catch (err) {
            alert(err.message);
            setPhoto(user.photoUrl || DEFAULT_AVATAR);
        } finally {
            setUploading(false);
            setShowMenu(false);
        }
    };

    const modalStyle = {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        padding: "10px"
    };

    const modalContentStyle = {
        background: "linear-gradient(60deg, #88bdf7, #FFA500)",
        padding: "20px",
        borderRadius: "12px",
        maxWidth: "500px",
        width: "100%",
        boxSizing: "border-box",
        overflowY: "auto",
        maxHeight: "90vh"
    };

    const closeButtonStyle = {
        marginTop: "15px",
        width: "100%",
        padding: "10px",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
        fontSize: "14px"
    };

    return (
        <div style={{ position: "relative", display: "inline-block" }}>
            {/* Perfil principal */}
            <div
                onClick={() => setShowMenu(!showMenu)}
                style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}
            >
                <img
                    src={photo + "?t=" + Date.now()}
                    alt="Perfil"
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: "50%",
                        objectFit: "cover"
                    }}
                    onError={(e) => (e.currentTarget.src = DEFAULT_AVATAR)}
                />
                <div style={{ display: "flex", flexDirection: "column", fontSize: "12px" }}>
                    <span><b>{user.username}</b></span>
                    <span>{user.role}</span>
                </div>
            </div>

            {message && <p style={{ color: "green", fontSize: "12px", marginTop: "4px" }}>{message}</p>}

            {/* Menú desplegable */}
            {showMenu && (
                <div style={{
                    position: "absolute",
                    top: "60px",
                    right: 0,
                    background: "linear-gradient(60deg, #88bdf7ff, #FFA500)",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                    zIndex: 100,
                    width: "180px"
                }}>
                    <button
                        style={{ width: "100%", padding: "8px", textAlign: "left", border: "none", background: "none", cursor: "pointer" }}
                        onClick={() => {
                            setShowProfileModal(true);
                            setShowMenu(false);
                        }}
                    >
                        Ver mi perfil
                    </button>
                    <button
                        style={{ width: "100%", padding: "8px", textAlign: "left", border: "none", background: "none", cursor: "pointer" }}
                        onClick={() => {
                            setShowChangePassModal(true);
                            setShowMenu(false);
                        }}
                    >
                        Cambiar contraseña
                    </button>
                </div>
            )}

            {/* Modal de MyProfile */}
            {showProfileModal && (
                <div style={modalStyle} onClick={() => setShowProfileModal(false)}>
                    <div style={modalContentStyle} onClick={e => e.stopPropagation()}>
                        <MyProfile />
                        <button
                            style={{ ...closeButtonStyle, backgroundColor: "#e74c3c", color: "#fff" }}
                            onClick={() => setShowProfileModal(false)}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}

            {/* Modal de Cambiar Contraseña */}
            {showChangePassModal && (
                <div style={modalStyle} onClick={() => setShowChangePassModal(false)}>
                    <div style={modalContentStyle} onClick={e => e.stopPropagation()}>
                        <ChangePassword />
                        <button
                            style={{ ...closeButtonStyle, backgroundColor: "#e74c3c", color: "#fff" }}
                            onClick={() => setShowChangePassModal(false)}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
