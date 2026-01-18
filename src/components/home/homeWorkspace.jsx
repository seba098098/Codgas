import ChangePassword from "./ChangePassword";
import AdminRegister from "./AdminRegister";
import UsersList from "../users/UsersList";
import MyProfile from "../Profile/MyProfile";
import { MODALS } from "../../constants/home";

export default function DashboardWorkspace({ activeModal, setActiveModal, user }) {
    switch (activeModal) {
        case MODALS.MY_PROFILE:
            return <MyProfile user={user} />;

        case MODALS.CHANGE_PASSWORD:
            return <ChangePassword />;

        case MODALS.ADMIN_REGISTER:
            return <AdminRegister onClose={() => setActiveModal(MODALS.NONE)} />;

        case MODALS.USERS_LIST:
            return (
                <UsersList
                    onClose={() => setActiveModal(MODALS.NONE)}
                    onOpenRegister={() => setActiveModal(MODALS.ADMIN_REGISTER)}
                />
            );

        default:
            return null;
    }
}
