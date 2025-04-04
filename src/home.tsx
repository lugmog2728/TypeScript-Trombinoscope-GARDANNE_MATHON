import React, { useState, useEffect } from 'react';
import { Trombi } from "./types/Trombi";
import TrombiList from "./components/TrombiList";
import Modal from "./utils/Modal";
import './App.css';
import AddTrombi from "./components/form/AddTrombi";
import { addElement, getElement, removeElement } from "./types/Database";

const Home: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [trombiList, setTrombiList] = useState<Trombi[]>([]);

    useEffect(() => {
        getElement('trombisStore', 'all').then((value) => {
            if (Array.isArray(value)) {
                const newTrombis: Trombi[] = value.map((element) => ({
                    id: element.uuid,
                    name: element.name,
                    photo: element.photo || "https://via.placeholder.com/150",
                    peoples: []
                }));
                setTrombiList(newTrombis);
            }
        });
    }, []);

    // 🔹 Ajouter un trombi
    const addTrombi = (newTrombi: Trombi) => {
        addElement('trombisStore', {
            uuid: Date.now(),
            name: newTrombi.name,
            photo: newTrombi.photo
        })
            .then(() => {
                // Récupérer à nouveau tous les trombis depuis IndexedDB
                getElement('trombisStore', 'all').then((value) => {
                    if (Array.isArray(value)) {
                        const newTrombis: Trombi[] = value.map((element) => ({
                            id: element.uuid,
                            name: element.name,
                            photo: element.photo || "https://via.placeholder.com/150",
                            peoples: []
                        }));
                        setTrombiList(newTrombis);
                    }
                });
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
