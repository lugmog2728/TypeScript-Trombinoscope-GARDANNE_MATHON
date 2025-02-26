import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import AddPerson from './AddPerson';
import '../style/modal.css'

export default function PortalExample() {
    const [showModal, setShowModal] = useState(true);

    return (
        <>
            <button onClick={() => setShowModal(true)}>Show modal</button>
            {showModal && createPortal(
                    <AddPerson onClose={() => setShowModal(false)} />,
                document.body
            )}
        </>
    );
}
