import React, {useState} from 'react'

import './App.css';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Contacts from './components/Contacts';

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const updateSearchTerm = (newTerm) => {
    setSearchTerm(newTerm);
  }

  return (
    <div>
      <Router>
        
        
        <Routes>
        
        <Route exact path="/homepage"  element={<Home/>} />
        <Route exact path="/contacts" element={<Contacts searchTerm={searchTerm}  onSearchChange={updateSearchTerm} />} />
        
      </Routes>
      </Router>
      
    </div>
  );
}

export default App;
