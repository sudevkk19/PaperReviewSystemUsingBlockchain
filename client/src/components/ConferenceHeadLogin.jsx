import React from 'react'
import { useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Axios from 'axios'
import { JournalContext } from '../contexts/JournalContext'
import styles from '../css/style1.module.css';

function JournalLogin () {

    const [adminCreds, setAdminCreds]  = useState({
        username:"",
        password:""
    })
    const navigate = useNavigate()
    const evaluateLogin = () => {
            Axios.post("http://localhost:3001/checkAdminName",{username:adminCreds.username,password:adminCreds.password}).then((response) => {
                if(response.data.message === 'Success') {
                    alert('Admin Logged in Successfully')
                    navigate('/AdminProfile')
                } else {
                    alert('Wrong Credentials!')
                    navigate('/ConferenceHeadLogin')
                }
                })
            
        }

    return (
        <div class="form1">

            <br />
            <br /><br />
            <br />
           
            <input type="text" placeholder="Username" onChange={(event) => {setAdminCreds ({ ...adminCreds , username:event.target.value})}} />
            <br /><br />          

             
            <input type="password" placeholder="Password" onChange={(event) => {setAdminCreds( {...adminCreds ,  password:event.target.value})}}/>
            <br />
            <br />
            <br />
            <br />
            
            <button className={styles.btn} onClick={evaluateLogin}>Submit</button>
            <br />
        </div>
    )
}

export default JournalLogin
