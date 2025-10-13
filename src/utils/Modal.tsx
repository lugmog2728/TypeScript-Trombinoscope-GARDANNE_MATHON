import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import '../style/modal.css';

interface ModalProps {
    onClose: () => void;
    children: React.ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        // Focus trap: focus the modal when it opens
        if (modalRef.current) {
            modalRef.current.focus();
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleOverlayKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            if (e.target === e.currentTarget) {
                e.preventDefault();
                onClose();
            }
        }
    };

    return createPortal(
        <div
            ref={modalRef}
            className="modal-overlay"
            onClick={handleOverlayClick}
            onKeyDown={handleOverlayKeyDown}
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
        >
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>,
        document.body
    );
}
