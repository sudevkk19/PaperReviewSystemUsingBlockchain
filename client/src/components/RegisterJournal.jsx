import React from 'react'
import { useState } from 'react'
import Axios from 'axios'
import {
    useNavigate
} from 'react-router-dom'
import styles from '../css/style1.module.css';

function App() {

    const navigate = useNavigate()
  const [jname, setJName] = useState("")
  const [juname, setJUname] = useState("")
  const [jpassword, setJPassword] = useState("")

  const createJournal = () => {
    Axios.post("http://localhost:3001/createJournal", {name: jname, username: juname, password: jpassword}).then((response) => {
      alert("Journal Created!")
      navigate('/Welcome')
      
    })
  }

  return (
    <div className="App">
      <div>
          <br />
          <br />
        <input type="text" placeholder="Name" onChange={(event) => {setJName(event.target.value) }}/>
        <br />
        <br />
        <br />
        <input type="username" placeholder="UserName" onChange={(event) => {setJUname(event.target.value)}}/>
        <br />
        <br />
        <input type="password" placeholder="Password" onChange={(event) => {setJPassword(event.target.value)}}/>
        <br />
        <br />
        <button className={styles.btn} onClick={createJournal}> Submit </button>
      </div>
    </div>
    
  );
}

export default App;
