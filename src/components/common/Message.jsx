/**
 * Componente Message
 * ------------------
 * Se encarga de mostrar mensajes de estado (error o éxito)
 * Es reutilizable en cualquier formulario
 */
export default function Message({ text }) {

    // Si no hay texto, no renderiza nada
    // Evita nodos innecesarios en el DOM
    if (!text) return null;

    // Determina el tipo de mensaje
    // Si contiene el emoji ✅ se considera éxito
    // En cualquier otro caso se considera error
    const type = text.includes("✅") ? "success" : "error";

    return (
        // Clase base + clase dinámica según el tipo
        // Ejemplo:
        // change-password-message success
        // change-password-message error
        <p className={`change-password-message ${type}`}>
            {text}
        </p>
    );
}
