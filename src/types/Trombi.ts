import {Person} from "./Person";
import {getElement} from "./Database";
import React from "react";

export interface Trombi {
    id: number;
    name: string;
    photo: Blob;
    peoples: Person[];
}

export function getAllTrombi(setTrombiList: React.Dispatch<React.SetStateAction<Trombi[]>>) {
    getElement('trombisStore', 'all')
        .then((value) => {
            if (Array.isArray(value)) {
                const newTrombis: Trombi[] = value.map((element) => {
                    const photo = element.photo instanceof Blob
                        ? element.photo
                        : new Blob();

                    return {
                        id: element.uuid,
                        name: element.name,
                        photo,
                        peoples: []
                    };
                });

                setTrombiList(newTrombis);
            }
        })
        .catch((error) => {
            console.error("Erreur lors de la récupération des trombis :", error);
        });
}

