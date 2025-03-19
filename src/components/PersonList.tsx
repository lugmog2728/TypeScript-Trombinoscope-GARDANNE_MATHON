import React from 'react';
import { Person } from '../types/Person';
import PersonCard from "./PersonCard";
import { SortableContext } from '@dnd-kit/sortable';
import { verticalListSortingStrategy } from '@dnd-kit/sortable';
import '../style/list.css';

interface PersonListProps {
    persons: Person[];
    removePerson: (id: number) => void;
}

const PersonList: React.FC<PersonListProps> = ({ persons, removePerson }) => {
    return (
        <div className="list">
            <SortableContext items={persons.map(person => person.id)} strategy={verticalListSortingStrategy}>
                {persons.map(person => (
                    <PersonCard key={person.id} person={person} removePerson={removePerson} />
                ))}
            </SortableContext>
        </div>
    );
};

export default PersonList;
