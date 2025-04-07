import React, { useEffect, useMemo } from 'react';
import { Person } from '../types/Person';
import { Trash2 } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import '../style/card.css';

interface PersonCardProps {
    person: Person;
    removePerson: (id: number) => void;
}

const PersonCard: React.FC<PersonCardProps> = ({ person, removePerson }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: person.id });

    const handleDelete = (event: React.MouseEvent) => {
        event.stopPropagation();
        removePerson(person.id);
    };

    const imageSrc = useMemo(() => URL.createObjectURL(person.photo), [person.photo]);

    useEffect(() => {
        return () => {
            URL.revokeObjectURL(imageSrc);
        };
    }, [imageSrc]);

    return (
        <div
            ref={setNodeRef}
            style={{ transform: CSS.Transform.toString(transform), transition }}
            className={`card ${person.category.toLowerCase()} ${transform ? 'dragging' : ''}`}
            {...listeners}
            {...attributes}
        >
            <img src={imageSrc} alt={person.name} />
            <p>{person.name}</p>
            <p>{person.category}</p>
            <button
                className="delete"
                onClick={handleDelete}
                onMouseDown={(e) => e.stopPropagation()}
                aria-label={`Supprimer ${person.name}`}
            >
                <Trash2 size={20} color="red" />
            </button>
        </div>
    );
};

export default PersonCard;
