import React from 'react';
import { Person } from '../types/Person';
import '../style/card.css';
import { Trash2 } from 'lucide-react';

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
            <button className="delete" onClick={() => removePerson(person.id)}>
                <Trash2 size={20} color={"red"} />
            </button>
        </div>
    );
};

export default PersonCard;
