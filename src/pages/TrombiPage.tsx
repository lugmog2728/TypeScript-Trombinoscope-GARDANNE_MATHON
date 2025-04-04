import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ExportPdf from "../components/form/ExportPdf";
import { Person } from "../types/Person";
import { Trombi } from "../types/Trombi";
import { DndContext, DragEndEvent, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import "../App.css";
import PersonList from "../components/PersonList";
import Modal from "../utils/Modal";
import AddPerson from "../components/form/AddPerson";
import {addElement, getElement, getMaxId, removeElement} from "../types/Database";

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

    useEffect(() => {
        let elements: Person[] = [];
        getElement("peoplesStore", "all").then((value: any) => {
            value.forEach((element: any) => {
                if (element.trombiID == trombi.id) { // 👈 Utiliser trombi.id directement
                    elements.push({
                        id: element.uuid,
                        name: element.name,
                        photo: element.photo,
                        category: element.category,
                    });
                }
            });
            setPersonList(elements);
        });
    }, [trombi.id]);



    const addPerson = (newPerson: Person) => {
        let id_person : number;
        id_person=0
        getMaxId('peoplesStore').then((maxId)=>{
            id_person=maxId +1
            addElement('peoplesStore', {
                id: id_person,
                trombiID: trombi.id,
                name: newPerson.name,
                photo: newPerson.photo,
                category: newPerson.category,
            }).then(
                ()=>{
                    let elements: Person[] = [];
                    getElement('peoplesStore','all').then((e)=>{
                        console.log(e)
                        }
                    )
                    setPersonList(elements);
                })
        });
    };

    const removePerson = (id_i: number) => {
        removeElement('peoplesStore',id_i)
        const index = personList.findIndex(person => person.id === id_i);

        if (index > -1) {
            setPersonList(personList.splice(index, 1)); // Supprime l'élément
        }
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
