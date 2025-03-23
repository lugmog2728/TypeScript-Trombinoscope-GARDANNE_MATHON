import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PersonList from "./components/PersonList";
import ExportPdf from "./components/form/ExportPdf";
import { Person } from "./types/Person";
import { Trombi } from "./types/Trombi";
import Modal from "./utils/Modal";
import AddPerson from "./components/form/AddPerson";
import { DndContext, DragEndEvent, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import "./App.css";


interface TrombiProps {
    trombi: Trombi;
}

const TrombiPage: React.FC<TrombiProps> = ({ trombi }) => {
    const [personList, setPersonList] = useState<Person[]>(trombi.peoples);
    const [showModalNewPerson, setShowModalNewPerson] = useState(false);
    const [showModalExport, setShowModalExport] = useState(false);
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
                <button onClick={() => setShowModalNewPerson(true)}>Ajouter une personne</button>
                <button onClick={() => setShowModalExport(true)}>Exporter le trombinoscope</button>
                <button onClick={() => navigate("/")} >
                    <ArrowLeft size={20} />
                </button>
            </div>

            <DndContext sensors={sensors} onDragEnd={handleDragEnd} >
                <PersonList persons={personList} removePerson={removePerson} />
            </DndContext>

            {showModalNewPerson && (
                <Modal onClose={() => setShowModalNewPerson(false)}>
                    <AddPerson addPerson={addPerson} onClose={() => setShowModalNewPerson(false)} />
                </Modal>
            )}

            {showModalExport && (
                <Modal onClose={() => setShowModalExport(false)}>
                    <ExportPdf personList={personList} onClose={() => setShowModalExport(false)} trombiName={trombi.name}/>
                </Modal>
            )}
        </div>
    );
};

export default TrombiPage;
