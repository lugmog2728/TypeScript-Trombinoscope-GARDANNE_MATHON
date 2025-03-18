import React from 'react';
import { createPortal } from 'react-dom';
import '../style/modal.css';

interface ModalProps {
    onClose: () => void;
    children: React.ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
    return createPortal(
        <div className="modal-overlay">
            <div className="modal-content">
                {children}
                <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">
                    Fermer
                </button>
            </div>
        </div>,
        document.body
    );
}
