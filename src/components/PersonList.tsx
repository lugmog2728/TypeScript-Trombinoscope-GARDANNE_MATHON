import React from 'react';
import { Person } from '../types/Person';
import PersonCard from './PersonCard';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import '../style/list.css';

interface PersonListProps {
    persons: Person[];
    removePerson: (id: number) => void;
}

const PersonList: React.FC<PersonListProps> = ({ persons, removePerson }) => {
    return (
        <div className="list">
            {persons.length === 0 ? (
                <p className="empty-message">Aucune personne à afficher.</p>
            ) : (
                <SortableContext items={persons.map(person => person.id)} strategy={verticalListSortingStrategy}>
                    {persons.map(person => (
                        <PersonCard key={person.id} person={person} removePerson={removePerson} />
                    ))}
                </SortableContext>
            )}
        </div>
    );
};

export default PersonList;
