import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './TrombiPage';
import reportWebVitals from './reportWebVitals';
import {Trombi} from "./types/Trombi";
import { Person} from "./types/Person"
import Index from "./Router";
import {addElement, init} from "./types/Database"

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

init()
root.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
