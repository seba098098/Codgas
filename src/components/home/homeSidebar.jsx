import { useRef, useEffect } from "react";
import Button from "../common/Button";
import "../../styles/Home/homeStyles.css";

export default function DashboardSidebar({
    role,
    onOpenUsers,
    sidebarOpen,
    setSidebarOpen,
}) {
    const sidebarRef = useRef(null);

    useEffect(() => {
        if (!sidebarOpen) return;

        const handleClickOutside = (event) => {
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target)
            ) {
                setSidebarOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [sidebarOpen, setSidebarOpen]);

    if (role !== "ADMIN") return null;

    return (
        <aside
            ref={sidebarRef}
            className={`sidebar ${sidebarOpen ? "open" : ""}`}
        >
            <h3>Opciones</h3>
            <Button
                text="Ver usuarios"
                variant="users"
                onClick={onOpenUsers}
            />
        </aside>
    );
}
