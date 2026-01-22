import { useEffect, useState } from "react";
import { sendRequest } from "../api/apiClient";

export function useAdminRegister(onClose) {
    const [form, setForm] = useState({
        username: "",
        password: "",
        role: "",
        nombre: "",
        apellido: "",
        fechaNacimiento: ""
    });

    const [roles, setRoles] = useState([]);
    const [loadingRoles, setLoadingRoles] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadRoles = async () => {
            try {
                const res = await sendRequest({ route: "roles" });
                if (res.success) setRoles(res.roles);
                else setError("No se pudieron cargar los roles");
            } catch {
                setError("Error al conectar con el servidor");
            } finally {
                setLoadingRoles(false);
            }
        };




        loadRoles();
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const submit = async (e) => {
        e.preventDefault();
        setError("");

        if (Object.values(form).some(v => !v)) {
            setError("Todos los campos son obligatorios");
            return;
        }

        const res = await sendRequest({
            route: "register",
            ...form
        });

        if (!res.success) {
            setError(res.error || "Error al crear usuario");
            return;
        }

        setForm({
            username: "",
            password: "",
            role: "",
            nombre: "",
            apellido: "",
            fechaNacimiento: ""
        });

        onClose?.();
    };

    return {
        form,
        roles,
        loadingRoles,
        error,
        handleChange,
        submit
    };
}
