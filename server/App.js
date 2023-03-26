import './App.css';
import { useState } from 'react'
import Axios from 'axios'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Redirect
} from 'react-router-dom'

import RegisterJournal from './components/RegisterJournal'


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path = "/" element={<RegisterJournal/>} />
        <Route exact path = "/registerJournal" element={<RegisterJournal/>} />
      </Routes>
    </Router>
    
  );
}

export default App;
