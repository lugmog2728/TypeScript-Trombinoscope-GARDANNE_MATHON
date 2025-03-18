import React, { useState } from "react";
import PersonList from "./components/PersonList";
import { Person } from "./types/Person";
import { Trombi } from "./types/Trombi";
import Modal from "./components/Modal";
import AddPerson from "./components/AddPerson";

interface TrombiProps {
    trombi: Trombi;
}

const TrombiPage: React.FC<TrombiProps> = ({ trombi }) => {
    const [personList, setPersonList] = useState<Person[]>(trombi.peoples);
    const [showModal, setShowModal] = useState(false);

    // 🔹 Ajoute une personne
    const addPerson = (newPerson: Person) => {
        setPersonList([...personList, { ...newPerson, id: Date.now() }]);
    };

    // 🔻 Supprime une personne
    const removePerson = (id: number) => {
        setPersonList(personList.filter(person => person.id !== id));
    };

    return (
        <div className="App">
            <h1>Trombinoscope</h1>

            <PersonList persons={personList} removePerson={removePerson} />

            <button onClick={() => setShowModal(true)} className="bg-blue-500 text-white px-4 py-2 rounded">
                Ajouter une personne
            </button>

            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <AddPerson addPerson={addPerson} onClose={() => setShowModal(false)} />
                </Modal>
            )}
        </div>
    );
};

export default TrombiPage;
