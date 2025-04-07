// TrombiList.tsx
import React from 'react';
import TrombiCard from "./TrombiCard";
import { Trombi } from "../types/Trombi";
import '../style/list.css';

interface TrombiListProps {
    trombis: Trombi[];
    removeTrombi: (id: number) => void;
}

const TrombiList: React.FC<TrombiListProps> = ({ trombis, removeTrombi }) => {
    return (
        <div className="list">
            {trombis.map((trombi) => (
                <TrombiCard
                    key={trombi.id}
                    trombi={trombi}
                    removeTrombi={removeTrombi}
                />
            ))}
        </div>
    );
};

export default TrombiList;
