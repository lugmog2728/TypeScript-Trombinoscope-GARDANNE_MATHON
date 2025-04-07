import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ExportPdf from "../components/form/ExportPdf";
import { getAllPersonByTrombi, Person } from "../types/Person";
import { Trombi } from "../types/Trombi";
import {
    DndContext,
    DragEndEvent,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import "../App.css";
import PersonList from "../components/PersonList";
import Modal from "../utils/Modal";
import AddPerson from "../components/form/AddPerson";
import { addElement, removeElement } from "../types/Database";

interface TrombiProps {
    trombi: Trombi;
}

const TrombiPage: React.FC<TrombiProps> = ({ trombi }) => {
    const [personList, setPersonList] = useState<Person[]>([]);
    const [showModalNewPerson, setShowModalNewPerson] = useState(false);
    const [showModalExport, setShowModalExport] = useState(false);
    const navigate = useNavigate();

    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

    useEffect(() => {
        getAllPersonByTrombi(trombi.id, setPersonList);
    }, [trombi.id]);

    const addPerson = (newPerson: Person) => {
        addElement("peoplesStore", {
            trombiId: trombi.id,
            name: newPerson.name,
            photo: newPerson.photo,
            category: newPerson.category,
        })
            .then(() => getAllPersonByTrombi(trombi.id, setPersonList))
            .catch((error) =>
                console.error("Erreur lors de l’ajout d’une personne :", error)
            );
    };

    const removePerson = (id: number) => {
        try {
            removeElement("peoplesStore", id);
            setPersonList((prevList) => prevList.filter((person) => person.id !== id));
        } catch (error) {
            console.error("Erreur lors de la suppression de la personne :", error);
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            const oldIndex = personList.findIndex((p) => p.id === active.id);
            const newIndex = personList.findIndex((p) => p.id === over?.id);
            const updatedList = [...personList];

            const [moved] = updatedList.splice(oldIndex, 1);
            updatedList.splice(newIndex, 0, moved);

            setPersonList(updatedList);
        }
    };

    return (
        <div>
            <div className="header">
                <h1>{trombi.name}</h1>
                <button onClick={() => setShowModalNewPerson(true)}>Ajouter une personne</button>
                <button onClick={() => setShowModalExport(true)}>Exporter le trombinoscope</button>
                <button onClick={() => navigate("/")}>
                    <ArrowLeft size={20} />
                </button>
            </div>

            <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
                <PersonList persons={personList} removePerson={removePerson} />
            </DndContext>

            {showModalNewPerson && (
                <Modal onClose={() => setShowModalNewPerson(false)}>
                    <AddPerson
                        addPerson={addPerson}
                        onClose={() => setShowModalNewPerson(false)}
                    />
                </Modal>
            )}

            {showModalExport && (
                <Modal onClose={() => setShowModalExport(false)}>
                    <ExportPdf
                        personList={personList}
                        onClose={() => setShowModalExport(false)}
                        trombiName={trombi.name}
                    />
                </Modal>
            )}
        </div>
    );
};

export default TrombiPage;
