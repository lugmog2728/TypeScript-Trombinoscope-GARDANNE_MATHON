// src/TrombiPage.tsx
import React from 'react';

import data from './data.json';
import {Trombi} from "./types/Trombi";
import TrombiList from "./components/TrombiList";
import './App.css';


const Home: React.FC = () => {

    const personList: Trombi[] = data.map(trombi => ({
        ...trombi,
        peoples: trombi.people.map(person => ({
            ...person,
            category: person.category as 'Professeur' | 'Stagiaire' | 'Etudiant'
        }))
    }));


    return (
        <div className="App">
            <div className="header">
                <h1>Trombinoscope</h1>
            </div>
            <TrombiList trombis={personList} />
        </div>
    );
};

export default Home;
