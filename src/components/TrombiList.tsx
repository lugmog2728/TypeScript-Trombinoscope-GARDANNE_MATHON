// TrombiList.tsx
import React from 'react';
import TrombiCard from "./TrombiCard";
import { Trombi } from "../types/Trombi";
import '../style/list.css';

interface TrombiListProps {
    trombis: Trombi[]; // an array of Trombi
}

const TrombiList: React.FC<TrombiListProps> = ({ trombis }) => {
    return (
        <div className="list">
            {trombis.map((trombi) => (
                <TrombiCard
                    key={trombi.id}
                    trombi={trombi}
                />
            ))}
        </div>
    );
};

export default TrombiList;
