import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trombi } from "../types/Trombi";
import '../style/card.css';

interface TrombiCardProps {
    trombi: Trombi;
}

const TrombiCard: React.FC<TrombiCardProps> = ({ trombi }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/trombi/${trombi.id}`); // Redirection vers "/trombi/id"
    };

    return (
        <div className="card" onClick={handleClick} style={{ cursor: "pointer" }}>
            <img src={trombi.photo} alt={trombi.name} />
            <p>{trombi.name}</p>
        </div>
    );
};

export default TrombiCard;
