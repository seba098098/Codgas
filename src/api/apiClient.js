
const API_URL = process.env.REACT_APP_API_URL;

// Función genérica para enviar requests al backend
export const sendRequest = async (payload) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            // Apps Script requiere este content-type
            "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify(payload)
    });

    // Apps Script devuelve texto, no JSON directo
    const text = await response.text();

    // Convertimos manualmente a JSON
    return JSON.parse(text);
};
