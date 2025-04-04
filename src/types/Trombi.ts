import {Person} from "./Person";
import {getElement} from "./Database";
import React from "react";

export interface Trombi {
    id: number;
    name: string;
    photo: string;
    peoples: Person[];
}

export function getAllTrombi(setTrombiList: React.Dispatch<React.SetStateAction<Trombi[]>>) {
    getElement('trombisStore', 'all').then((value) => {
        if (Array.isArray(value)) {
            const newTrombis: Trombi[] = value.map((element) => ({
                id: element.uuid,
                name: element.name,
                photo: element.photo || "https://via.placeholder.com/150",
                peoples: []
            }));
            setTrombiList(newTrombis);
        }
    }).catch((error) => {
        console.error("Erreur lors de la récupération des trombis :", error);
    });
}