// src/styles/myProfileStyles.js
export const myProfileStyles = {
    card: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 30,
        borderRadius: 20,
        background: "linear-gradient(60deg, #88bdf7, #FFA500)",
        maxWidth: 400,
        width: "100%",
        boxSizing: "border-box",
        margin: "20px auto",
        textAlign: "center"
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: "50%",
        objectFit: "cover",
        border: "3px solid #FFA500",
        marginBottom: 15
    },
    uploadButton: {
        cursor: "pointer",
        backgroundColor: "#FFA500",
        color: "#fff",
        padding: "8px 16px",
        borderRadius: 8,
        display: "inline-block",
        marginBottom: 15
    },
    row: {
        display: "flex",
        justifyContent: "space-between",
        background: "#f9f9f9",
        padding: "10px 15px",
        borderRadius: 8,
        marginTop: 8,
        width: "100%",
        boxSizing: "border-box",
        fontSize: 16
    },

    // 🔹 Ajustes para móvil
    mobile: {
        card: {
            padding: 20,
            borderRadius: 15
        },
        avatar: {
            width: 60,
            height: 60,
            marginBottom: 10
        },
        uploadButton: {
            padding: "6px 8px",
            fontSize: 12
        },
        row: {
            fontSize: 12,
            padding: "8px 10px"
        }
    }
};
