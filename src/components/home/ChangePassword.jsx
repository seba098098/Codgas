import Input from "../common/Input";
import Message from "../common/Message";
import { useChangePassword } from "../../hooks/useChangePassword";
import styles from "../../styles/Home/changePassword/changePasswordStyles";
import "../../styles/Home/changePassword/changePassword.css";

export default function ChangePassword() {
    const { form, loading, message, handleChange, submit } = useChangePassword();

    return (
        <div className="change-password-container">
            <form className="change-password-card" onSubmit={(e) => { e.preventDefault(); submit(); }}>
                <h2 className="change-password-title">Cambiar contraseña</h2>
                <Input name="oldPass" type="password" placeholder="Contraseña actual" value={form.oldPass} onChange={handleChange} style={styles.input} />
                <Input name="newPass" type="password" placeholder="Nueva contraseña" value={form.newPass} onChange={handleChange} style={styles.input} />
                <Input name="confirmPass" type="password" placeholder="Confirmar nueva contraseña" value={form.confirmPass} onChange={handleChange} style={styles.input} />
                <button type="submit" style={{ ...styles.button, ...(loading ? styles.buttonDisabled : {}) }} disabled={loading}>
                    {loading ? "Actualizando..." : "Cambiar contraseña"}
                </button>
                <Message text={message} />
            </form>
        </div>
    );
}
