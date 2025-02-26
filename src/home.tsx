// src/App.tsx
import React from 'react';

import data from './data.json';
import {Trombi} from "./types/Trombi";
import TrombiList from "./components/TrombiList";


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
            <h1>
                Trombinoscope</h1>
            <TrombiList trombis={personList} />
        </div>
    );
};

export default Home;
