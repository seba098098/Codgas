import { useState } from "react";
import DashboardTopBar from "../../components/home/homeTopBar";
import DashboardSidebar from "../../components/home/homeSidebar";
import DashboardWorkspace from "../../components/home/homeWorkspace";
import { MODALS } from "../../constants/home";
import "../../styles/Home/homeStyles.css";

export default function Dashboard({ user, logout }) {
    const [activeModal, setActiveModal] = useState(MODALS.NONE);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="dashboard-container">
            {/* TopBar */}
            <DashboardTopBar
                user={user}
                logout={logout}
                onToggleSidebar={() => setSidebarOpen(prev => !prev)}
                onChangePassword={() => setActiveModal(MODALS.CHANGE_PASSWORD)}
            />

            <div className="main-content">
                {/* Sidebar */}
                <DashboardSidebar
                    role={user?.role}
                    sidebarOpen={sidebarOpen ? true : false}
                    setSidebarOpen={setSidebarOpen} // 👈 esto faltaba
                    onOpenUsers={() => setActiveModal(MODALS.USERS_LIST)}
                />

                {/* Overlay solo si sidebar está abierto */}
                {sidebarOpen && (
                    <div
                        className="overlay"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Workspace */}
                <div className="workspace">
                    <DashboardWorkspace
                        activeModal={activeModal}
                        setActiveModal={setActiveModal}
                        user={user}
                    />
                </div>
            </div>
        </div>
    );
}
