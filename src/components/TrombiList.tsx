// TrombiList.tsx
import React from 'react';
import TrombiCard from "./TrombiCard";
import { Trombi } from "../types/Trombi";
import '../style/list.css';

interface TrombiListProps {
    trombis: Trombi[]; // an array of Trombi
    removeTrombi: (id: number) => void;

}

const TrombiList: React.FC<TrombiListProps> = ({ trombis, removeTrombi }) => {
    return (
        <div className="list">
            {trombis.map((trombi) => (
                <TrombiCard
                    trombi={trombi}
                    removeTrombi={removeTrombi}
                />
            ))}
        </div>
    );
};

export default TrombiList;
