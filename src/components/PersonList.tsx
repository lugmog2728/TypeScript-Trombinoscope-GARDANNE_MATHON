import React from 'react';
import { Person } from '../types/Person';
import PersonCard from "./PersonCard";
import '../style/list.css';

interface PersonListProps {
    persons: Person[];
    removePerson: (id: number) => void;
}

const PersonList: React.FC<PersonListProps> = ({ persons, removePerson }) => {
    return (
        <div className="list">
            {persons.map(person => (
                <div key={person.id} className="flex justify-between items-center">
                    <PersonCard person={person} />
                    <button
                        onClick={() => removePerson(person.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                        Supprimer
                    </button>
                </div>
            ))}
        </div>
    );
};

export default PersonList;
