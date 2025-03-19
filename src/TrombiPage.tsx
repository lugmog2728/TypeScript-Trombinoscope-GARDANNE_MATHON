import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; // 🔹 Import de l'icône
import PersonList from "./components/PersonList";
import { Person } from "./types/Person";
import { Trombi } from "./types/Trombi";
import Modal from "./components/Modal";
import AddPerson from "./components/AddPerson";
import "./App.css";

interface TrombiProps {
    trombi: Trombi;
}

const TrombiPage: React.FC<TrombiProps> = ({ trombi }) => {
    const [personList, setPersonList] = useState<Person[]>(trombi.peoples);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate(); // 🔹 Hook pour la navigation

    // 🔹 Ajoute une personne
    const addPerson = (newPerson: Person) => {
        setPersonList([...personList, { ...newPerson, id: Date.now() }]);
    };

    // 🔻 Supprime une personne
    const removePerson = (id: number) => {
        setPersonList(personList.filter(person => person.id !== id));
    };

    return (
        <div>
            <div className="header">
                <h1>{trombi.name}</h1>
                <button onClick={() => setShowModal(true)}>Ajouter une personne</button>
                <button onClick={() => navigate("/")} style={{ marginLeft: "10px", display: "flex", alignItems: "center", gap: "5px" }}>
                    <ArrowLeft size={20} />
                </button>
            </div>

            <PersonList persons={personList} removePerson={removePerson} />

            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <AddPerson addPerson={addPerson} onClose={() => setShowModal(false)} />
                </Modal>
            )}
        </div>
    );
};

export default TrombiPage;
