import './App.css';
import { useState,useEffect, useReducer } from 'react'
import Axios from 'axios'

function App() {
  const [jname, setJName] = useState("")
  const [juname, setJUname] = useState("")
  const [jpassword, setJPassword] = useState("")

  const createJournal = () => {
    Axios.post("http://localhost:3001/createJournal", {name: jname, username: juname, password: jpassword}).then((response) => {
      alert("Journal Created!")
    })
  }

  return (
    <div className="App">
      <div>
        <input type="text" placeholder="Name" onChange={(event) => {setJName(event.target.value) }}/>
        <br />
        <button onClick={createJournal}> Submit </button>
      </div>
    </div>

    
  );
}

export default App;
