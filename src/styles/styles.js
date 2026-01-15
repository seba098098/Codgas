export const styles = {
    loginContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(60deg, #88bdf7ff, #FFA500)", // verde gradiente
        fontFamily: "Arial, sans-serif"
    },
    loginCard: {
        backgroundColor: "#fff",
        padding: 30,
        borderRadius: 20,
        width: 320,
        boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
        textAlign: "center"
    },
    loginTitle: {
        marginBottom: 20,
        color: "#FFA500"
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
        fontSize: 16
    },
    loginButton: {
        padding: 12,
        borderRadius: 10,
        border: "none",
        backgroundColor: "#FFA500",
        color: "#fff",
        fontSize: 16,
        cursor: "pointer"
    },
    error: {
        color: "red",
        marginTop: 10
    },
    loginFooter: {
        marginTop: 15,
        fontSize: 14,
        color: "#555"
    },
    tableHeader: {
        borderBottom: "2px solid #ccc",
        padding: "8px",
        textAlign: "left",
        backgroundColor: "#f9f9f9"
    },
    tableCell: {
        borderBottom: "1px solid #eee",
        padding: "8px"
    }

};
