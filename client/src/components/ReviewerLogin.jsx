import React from 'react'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Axios from 'axios'
import styles from '../css/style1.module.css';
import { JournalContext } from '../contexts/JournalContext'
function ReviewerLogin() {
    const { setRname,RUname, setRUname } = useContext(JournalContext)
    const [RPassword, setRPassword] = useState("")
    const navigate = useNavigate()

    const evaluateLogin = () => {
        Axios.post('http://localhost:3001/checkReviewerByUserName', { username: RUname, password: RPassword }).then((response) => {
            if (response.data.message === 'Success') {
                alert('Reviewer Successfully Logged In')
                setRname(response.data.name)
                navigate('/ReviewerProfile')
            } else {
                alert('Wrong Credentials or Reviewer not registered!')
                navigate('/ReviewerLogin')
            }
        }
        )
    }

    return (
        <div>
            <br />
            <br />
            <br />
            <br />
            <input type="text" placeholder="Username" onChange={(event) => { setRUname(event.target.value) }} />
            <br /><br />

            <input type="password" placeholder="Password" onChange={(event) => { setRPassword(event.target.value) }} />
            <br /><br />

            <a className={styles.yo} href="/RegisterReviewer">Register Reviewer</a>
            <br />
            <br />

            <br />
            <button className={styles.btn} onClick={evaluateLogin}>Submit</button>
        </div>
    )
}

export default ReviewerLogin
