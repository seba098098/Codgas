import "../../styles/common/modal.css";
import { modalStyles } from "../../styles/common/modalStyles";

export default function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div className="modalOverlay" onClick={onClose}>
            <div className="modalContent" onClick={e => e.stopPropagation()}>
                {children}
                <button
                    style={modalStyles.closeButton}
                    onClick={onClose}
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
}
