// src/App.tsx
import React, { useState } from 'react';
import PersonList from './components/PersonList';
import { Person } from './types/Person';
import data from './data.json';


const App: React.FC = () => {

  const personList: Person[] = data.map(person => ({
    ...person,
    category: person.category as 'Professeur' | 'Stagiaire' | 'Etudiant'
  }));


  return (
      <div className="App">
        <h1>Trombinoscope</h1>
        <PersonList persons={personList} />
      </div>
  );
};

export default App;
