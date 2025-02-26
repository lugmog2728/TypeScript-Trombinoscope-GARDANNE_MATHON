// src/App.tsx
import PersonList from './components/PersonList';
import { Person } from './types/Person';
import data from './data.json';
import {Trombi} from "./types/Trombi";
import React from "react";

interface TrombiProps{
    trombi: Trombi
}

const App: React.FC<TrombiProps> = ({ trombi }) => {
     const personList: Person[] = trombi.peoples.map(person => ({
    ...person
  }));

  return (
      <div className="App">
        <h1>Trombinoscope</h1>
        <PersonList persons={personList} />
      </div>
  );
};

export default App;
