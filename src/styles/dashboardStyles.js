// src/styles/dashboardStyles.js

export const dashboardStyles = {
    container: {
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        fontFamily: "Arial, sans-serif",
        background: "linear-gradient(60deg, #88bdf7, #FFA500)", // gradiente azul → naranja
    },
    topBar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        borderBottom: "2px solid rgba(255,255,255,0.3)", // línea separadora más suave
        background: "linear-gradient(210deg, #88bdf7, #FFA500)", // gradiente azul → naranja
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
    },
    profileArea: {
        display: "flex",
        alignItems: "center",
        gap: "10px"
    },
    logoutButton: {
        padding: "5px 10px",
        borderRadius: "6px",
        border: "1px solid #fff",
        backgroundColor: "#fff",
        cursor: "pointer",
        fontSize: "14px",
        transition: "all 0.2s ease",
        fontWeight: "500",
        color: "#333"
    },
    mainContent: {
        display: "flex",
        flex: 1,
        position: "relative"
    },
    sidebar: {
        width: "220px",
        background: "linear-gradient(60deg, #88bdf7, #FFA500)", // gradiente azul → naranja
        padding: "20px",
        boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        borderRadius: "0 10px 10px 0" // bordes redondeados solo a la derecha
    },
    workspace: {
        flex: 1,
        padding: "20px",
        background: "linear-gradient(60deg, #88bdf7, #FFA500)", // gradiente azul → naranja
        borderRadius: "10px",
        margin: "10px"
    }
};
