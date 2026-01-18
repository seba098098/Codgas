import Profile from "../Profile/Profile";
import Button from "../common/Button";
import "../../styles/Home/homeStyles.css";

export default function DashboardTopBar({
    user,
    onToggleSidebar,
    onChangePassword,
    logout
}) {
    return (
        <header className="topBar">
            {/* Izquierda: menú + título */}
            <div className="leftSection">
                <Button text="☰" variant="menu" onClick={onToggleSidebar} />
                <span className="title">Codgas</span>
            </div>

            {/* Derecha: perfil + logout */}
            <div className="topActions">
                <Profile user={user} onChangePassword={onChangePassword} />
                <Button text="Cerrar sesión" variant="logout" onClick={logout} />
            </div>
        </header>
    );
}
