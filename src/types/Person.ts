import {getElement, getElementsByField} from "./Database";
import React from "react";

export interface Person {
    id: number;
    name: string;
    photo: string;
    category: "Professeur" | "Etudiant" | "Stagiaire";
}

export function getAllPersonByTrombi(
    trombiId: number,
    setPersonList: React.Dispatch<React.SetStateAction<Person[]>>
) {
    getElementsByField('peoplesStore', 'trombiId', trombiId).then((value) => {
        if (Array.isArray(value)) {
            const newPersons: Person[] = value.map((element) => ({
                id: element.uuid,
                name: element.name,
                photo: element.photo || "https://via.placeholder.com/150",
                category: element.category,
            }));
            setPersonList(newPersons);
        }
    }).catch((error) => {
        console.error("Erreur lors de la récupération des personnes :", error);
    });
}
