import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trombi } from "../types/Trombi";
import '../style/card.css';
import { Trash2 } from "lucide-react";

interface TrombiCardProps {
    trombi: Trombi;
    removeTrombi: (id: number) => void;
}

const TrombiCard: React.FC<TrombiCardProps> = ({ trombi, removeTrombi }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/trombi/${trombi.id}`);
    };

    const handleDelete = (event: React.MouseEvent) => {
        event.stopPropagation();
        removeTrombi(trombi.id);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleClick();
        }
    };

    return (
        <div
            className="card"
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            style={{ cursor: "pointer" }}
            aria-label={`Voir les détails de ${trombi.name}`}
        >
            <img src={URL.createObjectURL(trombi.photo)} alt={trombi.name} />
            <p>{trombi.name}</p>
            <button className="delete" onClick={handleDelete} onMouseDown={(e) => e.stopPropagation()}>
                <Trash2 size={20} color="red" />
            </button>
        </div>
    );
};

export default TrombiCard;
