export const styles = {
    loginContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(60deg, #88bdf7ff, #FFA500)",
        fontFamily: "Arial, sans-serif",
        padding: "10px", // evita que toque bordes en mobile
    },
    loginCard: {
        backgroundColor: "#fff",
        padding: 30,
        borderRadius: 20,
        width: 320,
        maxWidth: "100%", // que no sobresalga en mobile
        boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
        textAlign: "center",
        boxSizing: "border-box"
    },
    loginTitle: {
        marginBottom: 20,
        color: "#FFA500",
        fontSize: 24,
        fontWeight: "600"
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: 15
    },
    input: {
        padding: 12,
        borderRadius: 10,
        border: "1px solid #ddd",
        fontSize: 16,
        width: "100%",
        boxSizing: "border-box"
    },
    loginButton: {
        padding: 12,
        borderRadius: 10,
        border: "none",
        backgroundColor: "#FFA500",
        color: "#fff",
        fontSize: 16,
        cursor: "pointer",
        width: "100%"
    },
    error: {
        color: "red",
        marginTop: 10,
        fontSize: 14
    },
    loginFooter: {
        marginTop: 15,
        fontSize: 14,
        color: "#555"
    },

    // 🔹 estilos mobile (360x740)
    mobile: {
        loginCard: {
            width: "90%",
            padding: 20,
            borderRadius: 15
        },
        loginTitle: {
            fontSize: 20
        },
        input: {
            fontSize: 14,
            padding: 10
        },
        loginButton: {
            fontSize: 14,
            padding: 10
        },
        loginFooter: {
            fontSize: 12
        }
    }
};
