import React, { useState } from 'react';
import '../style/form.css';
import {Person} from "../types/Person";

interface ModalContentProps {
    onClose: () => void;
}

export default function ModalContent({ onClose }: ModalContentProps) {
    const [name, setName] = useState('');
    const [photo, setPhoto] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newPerson: Person = {
            id: 1,
            name:  name,
            photo: photo || "https://via.placeholder.com/150",
            category: category as 'Professeur' | 'Stagiaire' | 'Etudiant',
        };
        console.log(newPerson);
        onClose();
    }

    return (
        <div className="modal">
            <div>
                <h2>Ajouter une personne</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Nom</label>
                        <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Entrez le nom"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="photo">URL de la photo</label>
                        <input id="photo" type="text" value={photo} onChange={(e) => setPhoto(e.target.value)} placeholder="Entrez l'URL de la photo"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="category">Catégorie</label>
                        <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} >
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
