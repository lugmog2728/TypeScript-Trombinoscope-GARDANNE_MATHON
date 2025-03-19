import React from 'react';
import { Person } from '../types/Person';
import { Trash2 } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import '../style/card.css';

interface PersonCardProps {
    person: Person;
    removePerson: (id: number) => void;
    key?: number;
}

const PersonCard: React.FC<PersonCardProps> = ({ person, removePerson }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: person.id });

    const handleDelete = (event: React.MouseEvent) => {
        event.stopPropagation();
        removePerson(person.id);
    };

    return (
        <div ref={setNodeRef}
             style={{ transform: CSS.Transform.toString(transform), transition }}
             className={`card ${person.category.toLowerCase()}`}
             {...listeners}
             {...attributes}
        >
            <img src={person.photo} alt={person.name} />
            <p>{person.name}</p>
            <p>{person.category}</p>
            <button className="delete" onClick={handleDelete} onMouseDown={(e) => e.stopPropagation()}>
                <Trash2 size={20} color={"red"} />
            </button>
        </div>
    );
};

export default PersonCard;
