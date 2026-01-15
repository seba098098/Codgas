import { useEffect, useState } from "react";
import { sendRequest } from "../api/apiClient";
import { styles } from "../styles/styles";

export default function AdminRegister({ onClose }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [fechaNacimiento, setFechaNacimiento] = useState("");

    const [roles, setRoles] = useState([]);
    const [loadingRoles, setLoadingRoles] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const res = await sendRequest({ route: "roles" });
                if (res.success) {
                    setRoles(res.roles);
                } else {
                    setError("No se pudieron cargar los roles");
                }
            } catch {
                setError("Error al conectar con el servidor");
            } finally {
                setLoadingRoles(false);
            }
        };
        fetchRoles();
    }, []);

    const submit = async (e) => {
        e.preventDefault();
        setError("");

        if (!username || !password || !role || !nombre || !apellido || !fechaNacimiento) {
            setError("Todos los campos son obligatorios");
            return;
        }

        const res = await sendRequest({
            route: "register",
            username,
            password,
            role,
            nombre,
            apellido,
            fechaNacimiento
        });

        if (!res.success) {
            setError(res.error || "Error al crear usuario");
            return;
        }

        // Limpiar formulario
        setUsername("");
        setPassword("");
        setRole("");
        setNombre("");
        setApellido("");
        setFechaNacimiento("");

        if (onClose) onClose();
    };

    // 🔹 Estilos modernos
    const inputStyle = {
        width: "100%",
        padding: "10px",
        marginBottom: "12px",
        borderRadius: "6px",
        border: "1px solid #ccc",
        outline: "none",
        fontSize: "14px",
        transition: "border-color 0.2s",
    };

    const inputFocus = (e) => (e.currentTarget.style.borderColor = "#3498db");
    const inputBlur = (e) => (e.currentTarget.style.borderColor = "#ccc");

    const selectStyle = { ...inputStyle, appearance: "none", cursor: "pointer" };

    const buttonPrimary = {
        flex: 1,
        backgroundColor: "#3498db",
        color: "white",
        padding: "10px 15px",
        fontSize: "14px",
        borderRadius: "6px",
        border: "none",
        cursor: "pointer",
        transition: "all 0.2s ease",
    };

    const buttonSecondary = {
        flex: 1,
        backgroundColor: "#7f8c8d",
        color: "white",
        padding: "10px 15px",
        fontSize: "14px",
        borderRadius: "6px",
        border: "none",
        cursor: "pointer",
        transition: "all 0.2s ease",
    };

    return (
        <div style={{
            ...styles.card,
            maxWidth: "400px",
            margin: "0 auto",
            padding: "25px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
        }}>
            <h3 style={{ textAlign: "center", marginBottom: "20px", color: "#2c3e50" }}>
                Registrar nuevo usuario
            </h3>

            <form onSubmit={submit} style={{ display: "flex", flexDirection: "column" }}>
                <input
                    placeholder="Usuario"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    style={inputStyle}
                    onFocus={inputFocus}
                    onBlur={inputBlur}
                />

                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    style={inputStyle}
                    onFocus={inputFocus}
                    onBlur={inputBlur}
                />

                <input
                    placeholder="Nombre"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    style={inputStyle}
                    onFocus={inputFocus}
                    onBlur={inputBlur}
                />

                <input
                    placeholder="Apellido"
                    value={apellido}
                    onChange={e => setApellido(e.target.value)}
                    style={inputStyle}
                    onFocus={inputFocus}
                    onBlur={inputBlur}
                />

                <input
                    type="date"
                    placeholder="Fecha de nacimiento"
                    value={fechaNacimiento}
                    onChange={e => setFechaNacimiento(e.target.value)}
                    style={inputStyle}
                    onFocus={inputFocus}
                    onBlur={inputBlur}
                />

                {loadingRoles ? (
                    <p style={{ textAlign: "center" }}>Cargando roles...</p>
                ) : (
                    <select
                        value={role}
                        onChange={e => setRole(e.target.value)}
                        style={selectStyle}
                        onFocus={inputFocus}
                        onBlur={inputBlur}
                    >
                        <option value="">Seleccione un rol</option>
                        {roles.map(r => (
                            <option key={r.id} value={r.id}>
                                {r.name}
                            </option>
                        ))}
                    </select>
                )}

                {error && <p style={{ color: "red", marginBottom: "12px", textAlign: "center" }}>{error}</p>}

                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                    <button
                        type="submit"
                        style={buttonPrimary}
                        onMouseOver={e => e.currentTarget.style.backgroundColor = "#2980b9"}
                        onMouseOut={e => e.currentTarget.style.backgroundColor = "#3498db"}
                    >
                        Crear usuario
                    </button>

                    {onClose && (
                        <button
                            type="button"
                            style={buttonSecondary}
                            onMouseOver={e => e.currentTarget.style.backgroundColor = "#95a5a6"}
                            onMouseOut={e => e.currentTarget.style.backgroundColor = "#7f8c8d"}
                            onClick={onClose}
                        >
                            Cancelar
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}
