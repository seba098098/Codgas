import { useState, useEffect } from "react";
import styles from "../../styles/common/buttons";
import "../../styles/common/buttons.css";

export default function Button({ text, variant = "create", onClick, type = "button", disabled = false, style = {}, icon }) {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 360);

    // Detecta cambio de tamaño para responsive
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 360);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`btn btn-${variant}`}
            style={{
                ...styles.base,
                ...(styles[variant] || {}),
                ...(disabled ? styles.disabled : {}),
                ...(isMobile ? styles.mobile : {}),
                ...style
            }}
        >
            {icon && <span style={{ marginRight: "6px" }}>{icon}</span>}
            {text}
        </button>
    );
}
