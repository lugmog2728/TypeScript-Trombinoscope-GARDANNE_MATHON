// TrombiCard.tsx
import React from 'react';
import {Trombi} from "../types/Trombi";
import '../style/card.css';

interface TrombiCardProps {
    trombi: Trombi
}

const TrombiCard: React.FC<TrombiCardProps> = (props) => {
    return (
        <div
            className="card"
        >
            <img src={props.trombi.photo} alt={props.trombi.name}/>
            <p>{props.trombi.name}</p>
        </div>
    );
};

export default TrombiCard;
