import React from 'react'
import { useState } from 'react'
import Axios from 'axios'
import {
  useNavigate
} from 'react-router-dom'
import styles from '../css/style1.module.css';

function RegisterAuthor() {

  const navigate = useNavigate()
  const [Aid, setAid] = useState()
  const [aname, setAName] = useState("")
  const [auname, setAUname] = useState("")
  const [apassword, setAPassword] = useState("")

  Axios.post("http://localhost:3001/GetNextAuthID").then((response) => {
    if (response.data.message === 'Success') {
      var id = response.data.id
      setAid(id + 1)
    }
  })

  const createAuthor = () => {
    console.log(Aid)
    Axios.post("http://localhost:3001/createAuthor", { authid: Aid, name: aname, username: auname, password: apassword }).then((response) => {
      if(response.data.message === 'Success') {        
        Axios.post("http://localhost:3001/UpdateAuthID").then((response) => {
          if(response.data.message === 'Success') {
            alert("Author Created!")
            navigate('/Welcome')
          }
        })
        
      }
    })
  }

  return (
    <div className="App">
      <div>
        <input type="text" placeholder="Name" onChange={(event) => { setAName(event.target.value) }} />
        <br /><br />
        <input type="username" placeholder="UserName" onChange={(event) => { setAUname(event.target.value) }} />
        <br /><br />
        <input type="password" placeholder="Password" onChange={(event) => { setAPassword(event.target.value) }} />
        <br />
        <button className={styles.btn} onClick={createAuthor}> Submit </button>
      </div>
    </div>

  );
}

export default RegisterAuthor;
