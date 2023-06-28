import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard.js';
import RandomPokemon from './pages/random-pokemon.js'



function App() {
  return (

    // Main Container for whole React App. 
    // Here we define the BrowserRouter which allows us to navigate through different pages.
    <div className='App'>
      <BrowserRouter>
      <Routes>
      <Route exact path="/" element={<Dashboard/>} />
      <Route exact path="/random-pokemon" element={<RandomPokemon/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
