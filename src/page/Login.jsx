import React, { useState, useEffect } from "react";
import { styles } from "../styles/stylesLogin";

export default function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 360);

    // Detectar tamaño de pantalla
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 360);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        onLogin(username, password).catch(err => setError(err.message));
    };

    return (
        <div style={styles.loginContainer}>
            <div
                style={
                    isMobile
                        ? { ...styles.loginCard, ...styles.mobile.loginCard }
                        : styles.loginCard
                }
            >
                <h2
                    style={
                        isMobile
                            ? { ...styles.loginTitle, ...styles.mobile.loginTitle }
                            : styles.loginTitle
                    }
                >
                    WELCOME!!
                </h2>

                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        style={
                            isMobile
                                ? { ...styles.input, ...styles.mobile.input }
                                : styles.input
                        }
                        placeholder="Username / Email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        style={
                            isMobile
                                ? { ...styles.input, ...styles.mobile.input }
                                : styles.input
                        }
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button
                        type="submit"
                        style={
                            isMobile
                                ? { ...styles.loginButton, ...styles.mobile.loginButton }
                                : styles.loginButton
                        }
                    >
                        Login
                    </button>
                </form>

                {error && <p style={styles.error}>{error}</p>}

                <p
                    style={
                        isMobile
                            ? { ...styles.loginFooter, ...styles.mobile.loginFooter }
                            : styles.loginFooter
                    }
                >
                    Don't have an account? Codgas can give you one.
                </p>
            </div>
        </div>
    );
}
