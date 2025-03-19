// src/TrombiPage.tsx
import React, {useState} from 'react';

import data from './data.json';
import {Trombi} from "./types/Trombi";
import TrombiList from "./components/TrombiList";
import Modal from "./components/Modal";
import './App.css';
import AddPerson from "./components/AddPerson";
import AddTrombi from "./components/AddTrombi";
import {Person} from "./types/Person";


const Home: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [personList, setPersonList] = useState<Trombi[]>(
        data.map(trombi => ({
            ...trombi,
            peoples: trombi.people.map(person => ({
                ...person,
                category: person.category as 'Professeur' | 'Stagiaire' | 'Etudiant'
            }))
        }))
    );

    const addTrombi = (newTrombi: Trombi) => {
        setPersonList(prevList => [...prevList, newTrombi]);
    };

    const removeTrombi = (id: number) => {
        setPersonList(prevList => prevList.filter(trombi => trombi.id !== id));
    };

    return (
        <div className="App">
            <div className="header">
                <h1>Trombinoscope</h1>
                <button onClick={() => setShowModal(true)}>Ajouter un trombi</button>

            </div>
            <TrombiList trombis={personList} />

            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <AddTrombi addTrombi={addTrombi} onClose={() => setShowModal(false)} />
                </Modal>
            )}
        </div>
    );
};

export default Home;
