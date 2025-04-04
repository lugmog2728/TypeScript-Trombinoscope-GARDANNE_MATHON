import React, { useState } from "react";
import '../../style/form.css';
import { Person } from "../../types/Person";
import DropZone from '../../utils/DropZone';

interface AddPersonProps {
    addPerson: (person: Person) => void;
    onClose: () => void;
}

export default function AddPerson({ addPerson, onClose }: AddPersonProps) {
    const [name, setName] = useState('');
    const [photo, setPhoto] = useState<Blob | string>('');
    const [category, setCategory] = useState('');

    const handleFileSelect = (file: Blob) => {
        setPhoto(file); // Met à jour l'état photo avec un Blob
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name.trim() || !category) {
            alert("Veuillez remplir les champs obligatoires.");
            return;
        }

        const newPerson: Person = {
            id: Date.now(),
            name,
            photo: photo instanceof Blob ? photo : new Blob(),
            category: category as 'Professeur' | 'Stagiaire' | 'Etudiant',
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
                        <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Entrez le nom" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="photo">Photo</label>
                        <DropZone onFileSelect={handleFileSelect} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="category">Catégorie</label>
                        <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
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
