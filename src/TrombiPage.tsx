import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PersonList from "./components/PersonList";
import ExportPdf from "./components/form/ExportPdf";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Person } from "./types/Person";
import { Trombi } from "./types/Trombi";
import Modal from "./utils/Modal";
import AddPerson from "./components/form/AddPerson";
import { DndContext, DragEndEvent, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import "./App.css";

import PersonList from "./components/PersonList";
import Modal from "./components/Modal";
import AddPerson from "./components/AddPerson";
import {addElement, getElement, getMaxId, removeElement} from "./types/Database";
import {getNextKeyDef} from "@testing-library/user-event/dist/keyboard/getNextKeyDef";
import personCard from "./components/PersonCard";

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
const TrombiPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    let [personList, setPersonList] = useState<Person[]>([]);
    const [showModal, setShowModal] = useState(false);

    // 🔹 Charger les données de trombi à partir d'IndexedDB
    useEffect(() => {
        let elements: Person[] = [];
        getElement('peoplesStore','all').then((value:any)=>{
                value.forEach((element: any) => {
                    console.log(element)
                    if(element.trombiID == id){
                        let person = {
                            id: element.uuid,
                            name: element.name,
                            photo: element.photo,
                            category: element.category,
                        }
                        elements.push(person);
                    }
                })
            }
        )
        console.table(personList)
        console.table(elements);
        personList = elements;
    });


    const addPerson = (newPerson: Person) => {
        let id_person : number;
        id_person=0
        getMaxId('peoplesStore').then((maxId)=>{
            id_person=maxId +1
            addElement('peoplesStore', {
                uuid: id_person,
                trombiID: id,
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
