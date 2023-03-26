import React from 'react'
import { useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Axios from 'axios'
import styles from '../css/style1.module.css';
import { JournalContext } from '../contexts/JournalContext'

function AuthorLogin () {
    const { AUname, setAUname, setAname } = useContext(JournalContext)
    const [APassword, setAPassword] = useState ("")
    const navigate = useNavigate()

    const evaluateLogin = () => {
            Axios.post('http://localhost:3001/checkAuthorByUserName',{username: AUname, password: APassword}).then((response) => {            
            if(response.data.message === "Success") {
                alert('Author Login Successful')
                setAname(response.data.name)
                navigate('/AuthorProfile')
            } else {
                alert('Wrong Credentials or Author not registered!')
                navigate('/AuthorLogin')
            }})
        }

    return (
        <div class="form1">
            <br />
            <br />
            <br />
            <br />
            <br />
            <input type="text" placeholder="Username" onChange={(event) => {setAUname(event.target.value)}}/>
            <br /><br />
        
            <input type="password" placeholder="Password" onChange={(event) => {setAPassword(event.target.value)}}/>
            <br />
            <br />
            
            <br />
            <a className={styles.yo}href="/RegisterAuthor">Register Author</a>
            <br />
            
            <button className={styles.btn} onClick={evaluateLogin}>Submit</button>
        </div>
    )
}

export default AuthorLogin
