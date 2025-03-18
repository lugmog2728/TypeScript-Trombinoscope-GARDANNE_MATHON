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
                <PersonCard key={person.id} person={person} removePerson={removePerson} />
            ))}
        </div>
    );
};

export default PersonList;
