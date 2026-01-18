// Importamos los estilos del input
import styles from "../../styles/Home/changePassword/changePasswordStyles";
/**
 * Componente Input reutilizable
 * - Evita duplicar inputs en toda la app
 * - Centraliza estilos y comportamiento de focus
 */
export default function Input({
    // Nombre del input
    // Se usa para identificar el campo en el handleChange
    name,
    // Tipo de input (text, password, email, etc.)
    // Por defecto es "text"
    type = "text",
    // Texto que se muestra cuando el input está vacío
    placeholder,
    // Valor controlado desde el componente padre
    value,
    // Función que actualiza el estado (handleChange)
    onChange
}) {
    return (
        <input
            // Tipo del input (password, text, etc.)
            type={type}
            // Name es clave para manejar formularios con un solo handler
            name={name}
            // Texto guía
            placeholder={placeholder}
            // Input controlado por React
            value={value}
            // Evento que actualiza el estado del formulario
            onChange={onChange}
            // Estilo base del input
            style={styles.input}
            // Al hacer focus, aplicamos estilos visuales (borde, sombra)
            onFocus={(e) =>
                Object.assign(
                    e.currentTarget.style,
                    styles.inputFocus
                )
            }
            // Al perder el focus, volvemos al estilo base
            onBlur={(e) =>
                Object.assign(
                    e.currentTarget.style,
                    styles.input
                )
            }
        />
    );
}
