import { useState, useEffect } from "react";
import { MODALS } from "../../constants/home";
import { useProfile } from "../../hooks/useProfile";
import Modal from "../common/Modal";
import MyProfile from "./MyProfile";
import ChangePassword from "../home/ChangePassword";
import { profileStyles } from "../../styles/Home/profile/profileStyles";

export default function Profile({ user }) {
    const { photo, message } = useProfile(user);
    const [showMenu, setShowMenu] = useState(false);
    const [activeModal, setActiveModal] = useState(MODALS.NONE);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // control mobile

    // Detectar cambio de tamaño de pantalla
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const openModal = (modal) => {
        setActiveModal(modal);
        setShowMenu(false);
    };

    const closeModal = () => {
        setActiveModal(MODALS.NONE);
    };

    // Estilos adaptados
    const avatarStyle = isMobile
        ? { ...profileStyles.avatar, ...profileStyles.mobile.avatar }
        : profileStyles.avatar;

    const menuStyle = isMobile
        ? { ...profileStyles.menu, ...profileStyles.mobile.menu }
        : profileStyles.menu;

    const menuItemStyle = isMobile
        ? { ...profileStyles.menuItem, ...profileStyles.mobile.menuItem }
        : profileStyles.menuItem;

    return (
        <div style={profileStyles.container}>
            {/* Perfil (avatar + nombre) */}
            <div
                style={profileStyles.profileHeader}
                onClick={() => setShowMenu(!showMenu)}
            >
                <img
                    src={photo}
                    alt="Perfil"
                    style={avatarStyle}
                    onError={(e) =>
                        (e.currentTarget.src = process.env.REACT_APP_DEFAULT_AVATAR)
                    }
                />
                {!isMobile && (
                    <div>
                        <b>{user.username}</b>
                        <div>{user.role}</div>
                    </div>
                )}
            </div>

            {message && !isMobile && (
                <p style={profileStyles.message}>{message}</p>
            )}

            {/* Menú desplegable */}
            {showMenu && (
                <div style={menuStyle}>
                    <button
                        style={menuItemStyle}
                        onClick={() => openModal(MODALS.MY_PROFILE)}
                    >
                        Ver mi perfil
                    </button>

                    <button
                        style={menuItemStyle}
                        onClick={() => openModal(MODALS.CHANGE_PASSWORD)}
                    >
                        Cambiar contraseña
                    </button>
                </div>
            )}

            {/* Modales */}
            <Modal
                isOpen={activeModal === MODALS.MY_PROFILE}
                onClose={closeModal}
            >
                <MyProfile />
            </Modal>

            <Modal
                isOpen={activeModal === MODALS.CHANGE_PASSWORD}
                onClose={closeModal}
            >
                <ChangePassword />
            </Modal>
        </div>
    );
}
