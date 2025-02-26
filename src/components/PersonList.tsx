import React from 'react';
import { Person } from '../types/Person';
import PersonCard from "./PersonCard";
import '../style/list.css';

const PersonList: React.FC<{ persons: Person[] }> = ({ persons }) => {
    return (
        <div className="list">
            {persons.map(person => (
                <PersonCard key={person.id} person={person} />
            ))}
        </div>
    );
};

export default PersonList;