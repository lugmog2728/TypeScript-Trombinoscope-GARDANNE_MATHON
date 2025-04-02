import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Person } from "./types/Person";
import { Trombi } from "./types/Trombi";
import PersonList from "./components/PersonList";
import Modal from "./components/Modal";
import AddPerson from "./components/AddPerson";
import {addElement, getElement, getMaxId, removeElement} from "./types/Database";
import {getNextKeyDef} from "@testing-library/user-event/dist/keyboard/getNextKeyDef";
import personCard from "./components/PersonCard";

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
