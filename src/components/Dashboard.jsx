import React, { useState } from "react";
import Profile from "./Profile";
import ChangePassword from "./ChangePassword";
import AdminRegister from "./AdminRegister";
import UsersList from "./UsersList"; // ADMIN
import MyProfile from "./MyProfile"; // PERFIL PROPIO

import { dashboardStyles } from "../styles/dashboardStyles";

const Dashboard = ({ user, setUser, logout }) => {
    const [activeModal, setActiveModal] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const menuOptionStyle = {
        padding: "8px 12px",
        borderRadius: "6px",
        backgroundColor: "#FFA500",
        border: "1px solid #88bdf7ff",
        cursor: "pointer",
        transition: "all 0.2s ease",
        fontSize: "14px",
        textAlign: "left"
    };

    const menuOptionHover = (e) => (e.currentTarget.style.backgroundColor = "#f0f0f0");
    const menuOptionLeave = (e) => (e.currentTarget.style.backgroundColor = "#fff");


    return (
        <div style={dashboardStyles.container}>
            {/* Barra superior */}
            <div style={dashboardStyles.topBar}>
                <span
                    style={{ cursor: "pointer", fontSize: "20px", fontWeight: "bold" }}
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                    ☰
                </span>
                <span>Codgas</span>

                {/* Área perfil + cerrar sesión */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ position: "relative" }}>
                        {/* Click en foto/nombre abre menú */}
                        <div onClick={() => setShowProfileMenu(!showProfileMenu)}>
                            <Profile
                                user={user}
                                onChangePassword={() => setActiveModal("changePassword")}
                            />
                        </div>

                    </div>

                    <button
                        onClick={logout}
                        style={{ ...dashboardStyles.logoutButton, marginLeft: "10px" }}
                    >
                        Cerrar sesión
                    </button>
                </div>
            </div>

            {/* Contenedor principal */}
            <div style={dashboardStyles.mainContent}>
                {/* Sidebar solo ADMIN */}
                {sidebarOpen && user.role === "ADMIN" && (
                    <div style={dashboardStyles.sidebar}>
                        <h3>Opciones</h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                            <button
                                style={menuOptionStyle}
                                onClick={() => setActiveModal("usersList")}
                                onMouseEnter={menuOptionHover}
                                onMouseLeave={menuOptionLeave}
                            >
                                Ver lista de usuarios
                            </button>
                        </div>
                    </div>
                )}

                {/* Área de trabajo */}
                <div style={dashboardStyles.workspace}>
                    {activeModal === "myProfile" && <MyProfile user={user} />}
                    {activeModal === "changePassword" && <ChangePassword />}
                    {activeModal === "adminRegister" && <AdminRegister onClose={() => setActiveModal(null)} />}
                    {activeModal === "usersList" && (
                        <UsersList
                            onClose={() => setActiveModal(null)}
                            onOpenRegister={() => setActiveModal("adminRegister")}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
