import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './components/Index';
import Form from './components/Form';
import DisplayPeople from './components/DisplayPeople'
import DisplayPlanet from './components/DisplayPlanet'
import DisplayStarShip from './components/DisplayStarShip'
import DisplaySpecies from './components/DisplaySpecies';
import StateProvider from './context/StateProvider'
import HyperLink from './components/HyperLink'

function App() {

  return (
      <div className="App">
        <StateProvider>
          <BrowserRouter>
            <Form />
            {/* <Form results={results} setResults={setResults} categorySelector={categorySelector} setCategorySelector={setCategorySelector}
                      numberSelector={numberSelector} setNumberSelector={setNumberSelector} */}
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/people/:numberSelector" element={<DisplayPeople />} />
              <Route path="/planets/:numberSelector" element={<DisplayPlanet />} />
              <Route path="/starships/:numberSelector" element={<DisplayStarShip />} />
              <Route path="/species/:numberSelector" element={<DisplaySpecies />} />
              <Route path="/:category/:number" element={<DisplayPeople />} />
            </Routes>
          </BrowserRouter>
        </StateProvider>
      </div>
  );
}

export default App;
