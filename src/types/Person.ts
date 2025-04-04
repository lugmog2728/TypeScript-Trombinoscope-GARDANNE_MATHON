import { getElement, getElementsByField } from "./Database";
import React from "react";

export interface Person {
    id: number;
    name: string;
    photo: Blob;
    category: "Professeur" | "Etudiant" | "Stagiaire";
}

export async function getAllPersonByTrombi(
    trombiId: number,
    setPersonList: React.Dispatch<React.SetStateAction<Person[]>>
) {
    try {
        const value = await getElementsByField('peoplesStore', 'trombiId', trombiId);

        if (Array.isArray(value)) {
            const newPersons: Person[] = await Promise.all(value.map(async (element) => {
                let photo: Blob = new Blob();

                if (element.photo instanceof Blob) {
                    photo = element.photo;
                } else if (typeof element.photo === "string") {
                    try {
                        const response = await fetch(element.photo);
                        photo = await response.blob();
                    } catch (error) {
                        console.error("Erreur lors du chargement de la photo : ", error);
                        photo = new Blob();
                    }
                }

                return {
                    id: element.uuid,
                    name: element.name,
                    photo: photo,
                    category: element.category,
                };
            }));
            setPersonList(newPersons);
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des personnes :", error);
    }
}
