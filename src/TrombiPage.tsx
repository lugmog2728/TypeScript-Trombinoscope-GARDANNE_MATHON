import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PersonList from "./components/PersonList";
import { Person } from "./types/Person";
import { Trombi } from "./types/Trombi";
import Modal from "./components/Modal";
import AddPerson from "./components/AddPerson";
import { DndContext, DragEndEvent, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import "./App.css";

interface TrombiProps {
    trombi: Trombi;
}

const TrombiPage: React.FC<TrombiProps> = ({ trombi }) => {
    const [personList, setPersonList] = useState<Person[]>(trombi.peoples);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(TouchSensor)
    );

    // 🔹 Ajoute une personne
    const addPerson = (newPerson: Person) => {
        setPersonList([...personList, { ...newPerson, id: Date.now() }]);
    };

    // 🔻 Supprime une personne
    const removePerson = (id: number) => {
        setPersonList(personList.filter(person => person.id !== id));
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            const oldIndex = personList.findIndex(person => person.id === active.id);
            const newIndex = personList.findIndex(person => person.id === over?.id);

            const updatedList = [...personList];
            updatedList.splice(oldIndex, 1);
            updatedList.splice(newIndex, 0, personList[oldIndex]);

            setPersonList(updatedList);
        }
    };

    return (
        <div>
            <div className="header">
                <h1>{trombi.name}</h1>
                <button onClick={() => setShowModal(true)}>Ajouter une personne</button>
                <button onClick={() => navigate("/")} >
                    <ArrowLeft size={20} />
                </button>
            </div>

            <DndContext sensors={sensors} onDragEnd={handleDragEnd} >
                <PersonList persons={personList} removePerson={removePerson} />
            </DndContext>

            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <AddPerson addPerson={addPerson} onClose={() => setShowModal(false)} />
                </Modal>
            )}
        </div>
    );
};

export default TrombiPage;
