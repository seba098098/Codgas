export const usersStyles = {
    card: {
        padding: "20px",
        borderRadius: "12px",
        width: "100%",      // flexible para escritorio y móvil
        maxWidth: "1200px", // máximo ancho en escritorio
        margin: "0 auto"    // centrado horizontal
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",  // permite que el botón se mueva en móviles
        marginBottom: "12px"
    },
    button: (color) => ({
        backgroundColor: color,
        color: "#fff",
        padding: "6px 10px",
        fontSize: "12px",
        borderRadius: "6px",
        border: "none",
        cursor: "pointer",
        minWidth: "70px" // asegura legibilidad en móvil
    }),
    actions: {
        display: "flex",
        gap: "6px",
        justifyContent: "center",
        flexWrap: "wrap" // botones pueden bajar en móviles
    }
};
