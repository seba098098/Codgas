import { useEffect, useState } from "react";
import { sendRequest } from "../api/apiClient";
import { styles } from "../styles/styles";
import AdminRegister from "./AdminRegister";

const DEFAULT_AVATAR = process.env.REACT_APP_DEFAULT_AVATAR;

export default function UsersList({ onClose }) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [activeModal, setActiveModal] = useState(null); // 🔹 Para abrir AdminRegister

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            setError("");
            try {
                const res = await sendRequest({ route: "usersList" });
                if (res.success) {
                    const normalizedUsers = res.users.map(u => ({
                        ...u,
                        activo: u.activo === true || u.activo === "TRUE"
                    }));
                    setUsers(normalizedUsers);
                } else {
                    setError(res.error || "No se pudieron cargar los usuarios");
                }
            } catch (err) {
                console.error("ERROR FETCHING USERS:", err);
                setError("Error al conectar con el servidor");
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    // 🔹 Función para fotos
    const getPhotoUrl = (url) => {
        if (!url) return DEFAULT_AVATAR;
        if (url.includes("drive.google.com")) {
            try {
                let fileId = "";
                if (url.includes("thumbnail?id=")) {
                    const match = url.match(/thumbnail\?id=([a-zA-Z0-9_-]+)/);
                    if (match && match[1]) fileId = match[1];
                } else if (url.includes("export=view&id=")) {
                    const match = url.match(/export=view&id=([a-zA-Z0-9_-]+)/);
                    if (match && match[1]) fileId = match[1];
                }
                return fileId ? `https://drive.google.com/uc?export=view&id=${fileId}` : url;
            } catch {
                return DEFAULT_AVATAR;
            }
        }
        return url;
    };

    const toggleUser = async (username, activate) => {
        try {
            const token = localStorage.getItem("token");
            const route = activate ? "activateUser" : "deleteUser";
            const res = await sendRequest({ route, username, token });
            if (res.success) {
                setUsers(prev =>
                    prev.map(u =>
                        u.username === username ? { ...u, activo: activate } : u
                    )
                );
            } else {
                alert(res.error || "No se pudo actualizar el usuario");
            }
        } catch (err) {
            console.error(err);
            alert("Error al conectar con el servidor");
        }
    };

    const openPasswordModal = (username) => {
        setSelectedUser(username);
        setNewPassword("");
        setShowPasswordModal(true);
    };

    const submitNewPassword = async () => {
        if (!newPassword) return alert("Ingrese una nueva contraseña");

        try {
            const token = localStorage.getItem("token");
            const res = await sendRequest({
                route: "changeUserPassword",
                username: selectedUser,
                newPassword,
                token
            });
            if (res.success) {
                alert("Contraseña actualizada correctamente");
                setShowPasswordModal(false);
            } else {
                alert(res.error || "No se pudo cambiar la contraseña");
            }
        } catch (err) {
            console.error(err);
            alert("Error al conectar con el servidor");
        }
    };

    const buttonStyle = (color) => ({
        backgroundColor: color,
        color: "white",
        padding: "5px 10px",
        fontSize: "12px",
        borderRadius: "5px",
        border: "none",
        cursor: "pointer",
        transition: "background-color 0.2s"
    });

    return (
        <div style={styles.card}>
            <h3>Lista de Usuarios</h3>

            {/* Botón abrir modal de agregar usuario */}
            <button
                style={{ ...buttonStyle("#2ecc71"), marginBottom: "10px" }}
                onMouseOver={e => (e.currentTarget.style.backgroundColor = "#27ae60")}
                onMouseOut={e => (e.currentTarget.style.backgroundColor = "#2ecc71")}
                onClick={() => setActiveModal("adminRegister")}
            >
                Agregar nuevo usuario
            </button>

            {loading && <p>Cargando usuarios...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {!loading && !error && (
                <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "center" }}>
                        <thead>
                            <tr>
                                <th style={styles.tableHeader}>Foto</th>
                                <th style={styles.tableHeader}>Nombre</th>
                                <th style={styles.tableHeader}>Apellido</th>
                                <th style={styles.tableHeader}>Usuario</th>
                                <th style={styles.tableHeader}>Rol</th>
                                <th style={styles.tableHeader}>Fecha de Nacimiento</th>
                                <th style={styles.tableHeader}>Edad</th>
                                <th style={styles.tableHeader}>Activo</th>
                                <th style={styles.tableHeader}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((u, idx) => {
                                const photoUrl = getPhotoUrl(u.photoUrl);
                                const formattedDate = u.fechaNacimiento
                                    ? new Date(u.fechaNacimiento).toISOString().slice(0, 10)
                                    : "";
                                const isActive = u.activo;

                                return (
                                    <tr key={idx}>
                                        <td style={styles.tableCell}>
                                            <img
                                                src={photoUrl}
                                                alt="Foto usuario"
                                                style={{ width: 50, height: 50, borderRadius: "50%" }}
                                                onError={e => (e.currentTarget.src = DEFAULT_AVATAR)}
                                            />
                                        </td>
                                        <td style={styles.tableCell}>{u.nombre}</td>
                                        <td style={styles.tableCell}>{u.apellido}</td>
                                        <td style={styles.tableCell}>{u.username}</td>
                                        <td style={styles.tableCell}>{u.role_code}</td>
                                        <td style={styles.tableCell}>{formattedDate}</td>
                                        <td style={styles.tableCell}>{u.edad || ""}</td>
                                        <td style={styles.tableCell}>{isActive ? "Sí" : "No"}</td>
                                        <td style={styles.tableCell}>
                                            <div style={{ display: "flex", gap: "5px", justifyContent: "center" }}>
                                                {isActive ? (
                                                    <button
                                                        style={buttonStyle("#e74c3c")}
                                                        onMouseOver={e => e.currentTarget.style.backgroundColor = "#c0392b"}
                                                        onMouseOut={e => e.currentTarget.style.backgroundColor = "#e74c3c"}
                                                        onClick={() => toggleUser(u.username, false)}
                                                    >
                                                        Desactivar
                                                    </button>
                                                ) : (
                                                    <button
                                                        style={buttonStyle("#2ecc71")}
                                                        onMouseOver={e => e.currentTarget.style.backgroundColor = "#27ae60"}
                                                        onMouseOut={e => e.currentTarget.style.backgroundColor = "#2ecc71"}
                                                        onClick={() => toggleUser(u.username, true)}
                                                    >
                                                        Activar
                                                    </button>
                                                )}

                                                <button
                                                    style={buttonStyle("#3498db")}
                                                    onMouseOver={e => e.currentTarget.style.backgroundColor = "#2980b9"}
                                                    onMouseOut={e => e.currentTarget.style.backgroundColor = "#3498db"}
                                                    onClick={() => openPasswordModal(u.username)}
                                                >
                                                    Cambiar contraseña
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            <button
                style={{ ...buttonStyle("#382222ff"), marginTop: "10px" }}
                onMouseOver={e => e.currentTarget.style.backgroundColor = "#95a5a6"}
                onMouseOut={e => e.currentTarget.style.backgroundColor = "#7f8c8d"}
                onClick={onClose}
            >
                Cerrar
            </button>

            {/* Modal cambiar contraseña */}
            {showPasswordModal && (
                <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1000
                }}>
                    <div style={{
                        backgroundColor: "white",
                        padding: "20px",
                        borderRadius: "8px",
                        width: "300px",
                        textAlign: "center"
                    }}>
                        <h3>Cambiar contraseña</h3>
                        <p>Usuario: {selectedUser}</p>
                        <input
                            type="password"
                            placeholder="Nueva contraseña"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
                        />
                        <div>
                            <button
                                style={{ ...buttonStyle("#2ecc71"), marginRight: "10px" }}
                                onMouseOver={e => e.currentTarget.style.backgroundColor = "#27ae60"}
                                onMouseOut={e => e.currentTarget.style.backgroundColor = "#2ecc71"}
                                onClick={submitNewPassword}
                            >
                                Guardar
                            </button>
                            <button
                                style={{ ...buttonStyle("#e74c3c") }}
                                onMouseOver={e => e.currentTarget.style.backgroundColor = "#c0392b"}
                                onMouseOut={e => e.currentTarget.style.backgroundColor = "#e74c3c"}
                                onClick={() => setShowPasswordModal(false)}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal AdminRegister */}
            {activeModal === "adminRegister" && (
                <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1000
                }}>
                    <div style={{
                        background: "linear-gradient(60deg, #88bdf7, #FFA500)", // gradiente azul → naranja
                        padding: "20px",
                        borderRadius: "10px",
                        width: "400px",
                        maxWidth: "90%",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
                    }}>
                        <AdminRegister onClose={() => setActiveModal(null)} />
                    </div>
                </div>
            )}
        </div>
    );
}
