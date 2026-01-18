import { useState } from "react";
import { useUsersList } from "../../hooks/useUsersList";
import AdminRegister from "../home/AdminRegister";
import Modal from "../common/Modal";
import { usersStyles } from "../../styles/Home/users/usersStyles";
import "../../styles/Home/users/usersTable.css";
import { sendRequest } from "../../api/apiClient";

const DEFAULT_AVATAR = process.env.REACT_APP_DEFAULT_AVATAR;

export default function UsersList({ onClose }) {
    const { users, loading, error, toggleUser } = useUsersList();
    const [activeModal, setActiveModal] = useState(null);
    const [passwordUser, setPasswordUser] = useState(null);
    const [newPassword, setNewPassword] = useState("");

    const submitNewPassword = async () => {
        if (!newPassword) return alert("Ingrese una nueva contraseña");

        try {
            const token = localStorage.getItem("token");
            const res = await sendRequest({
                route: "changeUserPassword",
                username: passwordUser,
                newPassword,
                token
            });

            if (res.success) {
                alert("Contraseña actualizada correctamente");
                setPasswordUser(null);
                setNewPassword("");
            } else {
                alert(res.error || "No se pudo cambiar la contraseña");
            }
        } catch (err) {
            console.error(err);
            alert("Error al conectar con el servidor");
        }
    };

    return (
        <div style={usersStyles.card}>
            <div style={usersStyles.header}>
                <h3>Usuarios</h3>
                <button
                    style={usersStyles.button("#2ecc71")}
                    onClick={() => setActiveModal("REGISTER")}
                >
                    + Usuario
                </button>
            </div>

            {loading && <p>Cargando usuarios...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* 📋 Desktop Table */}
            <div className="usersTableWrapper desktop">
                <table className="usersTable">
                    <thead>
                        <tr>
                            <th>Foto</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Usuario</th>
                            <th>Rol</th>
                            <th>Activo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(u => (
                            <tr key={u.username}>
                                <td>
                                    <img
                                        src={u.photoUrl || DEFAULT_AVATAR}
                                        className="userAvatar"
                                        onError={e => (e.currentTarget.src = DEFAULT_AVATAR)}
                                    />
                                </td>
                                <td>{u.nombre}</td>
                                <td>{u.apellido}</td>
                                <td>{u.username}</td>
                                <td>{u.role_code}</td>
                                <td>{u.activo ? "Sí" : "No"}</td>
                                <td>
                                    <div style={usersStyles.actions}>
                                        <button
                                            style={usersStyles.button(
                                                u.activo ? "#e74c3c" : "#2ecc71"
                                            )}
                                            onClick={() => toggleUser(u.username, !u.activo)}
                                        >
                                            {u.activo ? "Desactivar" : "Activar"}
                                        </button>

                                        <button
                                            style={usersStyles.button("#3498db")}
                                            onClick={() => setPasswordUser(u.username)}
                                        >
                                            Password
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* 📱 Mobile Cards */}
            <div className="usersCardsWrapper mobile">
                {users.map(u => (
                    <div className="userCard" key={u.username}>
                        <img
                            src={u.photoUrl || DEFAULT_AVATAR}
                            className="userAvatar"
                            onError={e => (e.currentTarget.src = DEFAULT_AVATAR)}
                        />
                        <div className="userInfo">
                            <p><strong>{u.nombre} {u.apellido}</strong></p>
                            <p>Usuario: {u.username}</p>
                            <p>Rol: {u.role_code}</p>
                            <p>Activo: {u.activo ? "Sí" : "No"}</p>
                        </div>
                        <div className="userActions">
                            <button
                                style={usersStyles.button(
                                    u.activo ? "#e74c3c" : "#2ecc71"
                                )}
                                onClick={() => toggleUser(u.username, !u.activo)}
                            >
                                {u.activo ? "Desactivar" : "Activar"}
                            </button>
                            <button
                                style={usersStyles.button("#3498db")}
                                onClick={() => setPasswordUser(u.username)}
                            >
                                Password
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <button
                style={{ ...usersStyles.button("#7f8c8d"), marginTop: "12px" }}
                onClick={onClose}
            >
                Cerrar
            </button>

            {/* Modal cambio de contraseña */}
            <Modal isOpen={!!passwordUser} onClose={() => setPasswordUser(null)}>
                <h3>Cambiar contraseña</h3>
                <p>Usuario: {passwordUser}</p>
                <input
                    type="password"
                    placeholder="Nueva contraseña"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    style={{ width: "95%", padding: "8px", marginBottom: "8px" }}
                />
                <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                    <button
                        style={usersStyles.button("#2ecc71")}
                        onClick={submitNewPassword}
                    >
                        Guardar
                    </button>
                    <button
                        style={usersStyles.button("#e74c3c")}
                        onClick={() => setPasswordUser(null)}
                    >
                        Cancelar
                    </button>
                </div>
            </Modal>

            {/* Modal registro de usuario */}
            <Modal
                isOpen={activeModal === "REGISTER"}
                onClose={() => setActiveModal(null)}
            >
                <AdminRegister onClose={() => setActiveModal(null)} />
            </Modal>
        </div>
    );
}
