import React, { useState } from "react";
import '../../style/form.css';
import { Trombi } from "../../types/Trombi";
import DropZone from "../../utils/DropZone";

interface AddTrombiProps {
    addTrombi: (trombi: Trombi) => void;
    onClose: () => void;
}

export default function AddTrombi({ addTrombi, onClose }: AddTrombiProps) {
    const [name, setName] = useState<string>('');
    const [photo, setPhoto] = useState<Blob | null>(null);

    const handleFileSelect = (file: Blob) => {
        setPhoto(file);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name.trim()) {
            alert('Veuillez remplir le nom.');
            return;
        }

        const newTrombi: Trombi = {
            id: Date.now(),
            name,
            photo: photo ?? new Blob(),
            peoples: []
        };

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
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Entrez le nom"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="photo">Photo</label>
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
