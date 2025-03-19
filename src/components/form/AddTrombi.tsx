import React, { useState } from "react";
import '../../style/form.css';
import { Trombi } from "../../types/Trombi";
import DropZone from "../../utils/DropZone";

interface AddTrombiProps {
    addTrombi: (trombi: Trombi) => void;
    onClose: () => void;
}

export default function AddTrombi({addTrombi, onClose }: AddTrombiProps) {
    const [name, setName] = useState('');
    const [photo, setPhoto] = useState('');

    const handleFileSelect = (file: string) => {
        setPhoto(file);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name.trim()) {
            alert('Veuillez rempir les champs obligatoires.');
            return;
        }

        const newTrombi: Trombi = {
            id: Date.now(),
            name,
            photo: photo || "https://via.placeholder.com/150",
            peoples: []
        }

        addTrombi(newTrombi);
        onClose();
    };

        return (
            <div className="modal">
                <div>
                    <h2>Ajouter un trombinoscope</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Nom</label>
                            <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Entrez le nom" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="photo">URL de la photo</label>
                            <DropZone onFileSelect={handleFileSelect} />
                        </div>

                        <div className="form-actions">
                            <button type="button" onClick={onClose}>Fermer</button>
                            <button type="submit">Ajouter</button>
                        </div>
                    </form>
                </div>
            </div>
    );
}
