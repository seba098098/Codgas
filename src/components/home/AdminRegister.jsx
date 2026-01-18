import { useAdminRegister } from "../../hooks/useAdminRegister";
import { dashboardStyles } from "../../styles/Home/homeStyles";

export default function AdminRegister({ onClose }) {
    const {
        form,
        roles,
        loadingRoles,
        error,
        handleChange,
        submit
    } = useAdminRegister(onClose);

    return (
        <div style={dashboardStyles.card}>
            <h3 style={{ textAlign: "center" }}>Registrar nuevo usuario</h3>

            <form onSubmit={submit}>
                <input name="username" placeholder="Usuario" value={form.username} onChange={handleChange} />
                <input name="password" type="password" placeholder="Contraseña" value={form.password} onChange={handleChange} />
                <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} />
                <input name="apellido" placeholder="Apellido" value={form.apellido} onChange={handleChange} />
                <input name="fechaNacimiento" type="date" value={form.fechaNacimiento} onChange={handleChange} />

                {loadingRoles ? (
                    <p>Cargando roles...</p>
                ) : (
                    <select name="role" value={form.role} onChange={handleChange}>
                        <option value="">Seleccione un rol</option>
                        {roles.map(r => (
                            <option key={r.id} value={r.id}>{r.name}</option>
                        ))}
                    </select>
                )}

                {error && <p style={{ color: "red" }}>{error}</p>}

                <div style={{ display: "flex", gap: "10px" }}>
                    <button type="submit">Crear</button>
                    {onClose && (
                        <button type="button" onClick={onClose}>
                            Cancelar
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}
