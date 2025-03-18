import React from 'react';
import { Person } from '../types/Person';
import '../style/card.css';

interface PersonCardProps {
    person: Person;
    removePerson: (id: number) => void;
}

const PersonCard: React.FC<PersonCardProps> = ({ person, removePerson }) => {
    return (
        <div className="card">
            <img src={person.photo} alt={person.name} />
            <p>{person.name}</p>
            <p>{person.category}</p>
            <button onClick={() => removePerson(person.id)}> Supprimer </button>
        </div>
    );
};

export default PersonCard;
