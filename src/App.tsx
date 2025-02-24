// src/App.tsx
import React, { useState } from 'react';
import PersonCard from './components/PersonCard';
import PersonList from './components/PersonList';
import { Person } from './types/Person';

const App: React.FC = () => {

  const personList: Person[] = [
    {
      id: 1,
      name: 'Alice',
      photo: 'https://soriavie.fr/wp-content/uploads/pissenlit.jpg',
      category: 'Professeur',
    },
    {
      id: 2,
      name: 'Bob',
      photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScg5NorMDQhcXtEYCHA8MhWzjCeZiBd6dChQ&s',
      category: 'Professeur',
    },
  ];

  return (
      <div className="App">
        <h1>Trombinoscope</h1>
        <PersonList persons={personList} />
      </div>
  );
};

export default App;
