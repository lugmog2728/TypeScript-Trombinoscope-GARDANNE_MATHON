import React, { useState, useEffect } from 'react';
import {getAllTrombi, Trombi} from "../types/Trombi";
import TrombiList from "../components/TrombiList";
import Modal from "../utils/Modal";
import '../App.css';
import AddTrombi from "../components/form/AddTrombi";
import { addElement, getElement, removeElement } from "../types/Database";

const Home: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [trombiList, setTrombiList] = useState<Trombi[]>([]);

    useEffect(() => {
        getAllTrombi(setTrombiList);
    }, []);

// 🔹 Ajouter un trombi
    const addTrombi = (newTrombi: Trombi) => {
        addElement('trombisStore', {
            uuid: Date.now(),
            name: newTrombi.name,
            photo: newTrombi.photo
        })
            .then(() => {
                getAllTrombi(setTrombiList);
            })
            .catch((error) => console.error('Error adding trombi:', error));
    };



    // 🔹 Supprimer un trombi
    const removeTrombi = async (id: number) => {
        try {
            removeElement('trombisStore', id);
            setTrombiList(prevList => prevList.filter(trombi => trombi.id !== id));
        } catch (error) {
            console.error("Erreur lors de la suppression du trombi :", error);
        }
    };

    return (
        <div className="App">
            <div className="header">
                <h1>Trombinoscope</h1>
                <button onClick={() => setShowModal(true)}>Ajouter un trombi</button>
            </div>
            <TrombiList trombis={trombiList} removeTrombi={removeTrombi} />

            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <AddTrombi addTrombi={addTrombi} onClose={() => setShowModal(false)} />
                </Modal>
            )}
        </div>
    );
};

export default Home;
