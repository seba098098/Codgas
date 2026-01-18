export const profileStyles = {
    container: {
        position: "relative",
        display: "inline-block"
    },
    profileHeader: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        cursor: "pointer"
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: "50%",
        objectFit: "cover"
    },
    name: {
        fontSize: 14,
        color: "#333"
    },
    menu: {
        position: "absolute",
        top: "60px",
        right: 0,
        background: "linear-gradient(60deg, #88bdf7, #ffa500)",
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        width: "180px",
        zIndex: 100
    },
    menuItem: {
        width: "100%",
        padding: "10px",
        border: "none",
        background: "transparent",
        textAlign: "left",
        cursor: "pointer",
        fontSize: 14
    },
    message: {
        fontSize: 12,
        color: "green",
        marginTop: 4
    },

    // 🔹 Estilos para mobile <= 768px
    mobile: {
        avatar: {
            width: 40,
            height: 40
        },
        name: {
            display: "none" // 🔹 ocultar el nombre en pantallas ≤768px
        },
        menu: {
            top: "50px",
            width: "150px"
        },
        menuItem: {
            fontSize: 12
        }
    }
};
