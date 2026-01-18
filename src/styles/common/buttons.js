// Estilos base y variantes de botones, con soporte mobile
const buttons = {
    // Estilo base (todos los botones)
    base: {
        padding: "10px 10px",
        borderRadius: "10px",
        border: "none",
        fontSize: "12px",
        fontWeight: "100",
        cursor: "pointer",
        transition: "all 0.3s ease",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "auto",
        minWidth: "80px",
    },

    // Botones variantes
    close: { background: "#e0e0e0", color: "#333" },
    logout: { background: "linear-gradient(60deg, #ff5252, #86666cff)", color: "#fff" },
    users: { background: "linear-gradient(60deg, #42a5f5, #112333ff)", color: "#fff" },
    profile: { background: "linear-gradient(60deg, #7e57c2, #5e35b1)", color: "#fff" },
    password: { background: "linear-gradient(60deg, #88bdf7, #FFA500)", color: "#fff" },
    add: { background: "linear-gradient(60deg, #4caf50, #2e7d32)", color: "#fff" },
    create: { background: "linear-gradient(60deg, #26c6da, #00838f)", color: "#fff" },
    menu: { background: "linear-gradient(60deg, #ffd902ff, #570000ff)", color: "#fff" },

    // Deshabilitado
    disabled: { opacity: 0.6, cursor: "not-allowed" },

    // Ajustes responsive (puede sobrescribirse con props)
    mobile: {
        padding: "6px 12px",
        fontSize: "12px",
        minWidth: "60px"
    }
};

export default buttons;
