import React from 'react';
import { Person } from '../types/Person';
import '../style/personCard.css';

const PersonCard: React.FC<{ person: Person, key?: number }> = ({ person }) => {
    return (
        <div className="person-card">
            <img src={person.photo} alt={person.name} />
            <p>{person.name}</p>
            <p>{person.category}</p>
        </div>
    );
};

export default PersonCard;
