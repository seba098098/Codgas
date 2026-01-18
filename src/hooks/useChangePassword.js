import { useState } from "react";
import { sendRequest } from "../api/apiClient";

/**
 * Hook encargado de TODA la lógica del cambio de contraseña
 * - Maneja estados
 * - Valida datos
 * - Consume el backend
 * - Devuelve funciones limpias al componente
 */
export const useChangePassword = () => {

    // Estado centralizado del formulario
    const [form, setForm] = useState({
        oldPass: "",
        newPass: "",
        confirmPass: ""
    });

    // Estado de carga (spinner / disabled button)
    const [loading, setLoading] = useState(false);

    // Mensaje de error o éxito
    const [message, setMessage] = useState("");

    /**
     * Maneja los cambios de cualquier input
     * Usa el atributo "name" para identificar el campo
     */
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    /**
     * Envío del formulario
     * - Valida
     * - Llama a la API
     * - Maneja errores
     */
    const submit = async () => {
        const { oldPass, newPass, confirmPass } = form;

        // 🔴 Validaciones
        if (!oldPass || !newPass || !confirmPass) {
            setMessage("Todos los campos son obligatorios");
            return;
        }

        if (newPass.length < 6) {
            setMessage("La nueva contraseña debe tener al menos 6 caracteres");
            return;
        }

        if (newPass !== confirmPass) {
            setMessage("La nueva contraseña y la confirmación no coinciden");
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            // Token debería venir de useAuth (mejora futura)
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

            // ✅ Limpia el formulario si fue exitoso
            setForm({
                oldPass: "",
                newPass: "",
                confirmPass: ""
            });

            setMessage("Contraseña actualizada correctamente ✅");

        } catch (error) {
            setMessage("Error al conectar con el servidor");
        } finally {
            setLoading(false);
        }
    };

    // 🔁 Retornamos todo lo que el componente necesita
    return {
        form,
        loading,
        message,
        handleChange,
        submit
    };
};
