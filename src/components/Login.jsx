import React, { useState } from "react";
import { styles } from "../styles/styles";

export default function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        onLogin(username, password).catch(err => setError(err.message));
    };

    return (
        <div style={styles.loginContainer}>
            <div style={styles.loginCard}>
                <h2 style={styles.loginTitle}>WELCOME!!</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        style={styles.input}
                        placeholder="Username / Email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        style={styles.input}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button style={styles.loginButton}>Login</button>
                </form>
                {error && <p style={styles.error}>{error}</p>}
                <p style={styles.loginFooter}>
                    Don't have an account?,it Codgas give one account.
                </p>
            </div>
        </div>
    );
}


/*
//Formulario de login aislado.
import { useState } from "react";
import { styles } from "../styles/styles";

export default function Login({ onLogin, error }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div style={styles.container}>
            <h2>Login</h2>

            <form
                style={styles.form}
                onSubmit={(e) => {
                    e.preventDefault();
                    onLogin(username, password);
                }}
            >
                <input
                    style={styles.input}
                    placeholder="Usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <input
                    style={styles.input}
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button style={styles.button}>Ingresar</button>
            </form>

            {error && <p style={styles.error}>{error}</p>}
        </div>
    );
}
*/