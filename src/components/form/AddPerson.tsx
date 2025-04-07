import React, { useState } from "react";
import '../../style/form.css';
import { Person } from "../../types/Person";
import DropZone from '../../utils/DropZone';

type Category = 'Professeur' | 'Stagiaire' | 'Etudiant';

interface AddPersonProps {
    addPerson: (person: Person) => void;
    onClose: () => void;
}

export default function AddPerson({ addPerson, onClose }: AddPersonProps) {
    const [name, setName] = useState<string>('');
    const [photo, setPhoto] = useState<Blob | null>(null);
    const [category, setCategory] = useState<Category | ''>('');

    const handleFileSelect = (file: Blob) => {
        setPhoto(file);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name.trim() || !category || !photo) {
            alert("Veuillez remplir tous les champs obligatoires.");
            return;
        }

        const newPerson: Person = {
            id: Date.now(),
            name,
            photo,
            category,
        };

        addPerson(newPerson);
        onClose();
    };

    return (
        <div className="modal">
            <div>
                <h2>Ajouter une personne</h2>
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

                    <div className="form-group">
                        <label htmlFor="category">Catégorie</label>
                        <select
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value as Category)}
                            required
                        >
                            <option value="">Sélectionnez une catégorie</option>
                            <option value="Professeur">Professeur</option>
                            <option value="Stagiaire">Stagiaire</option>
                            <option value="Etudiant">Etudiant</option>
                        </select>
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
