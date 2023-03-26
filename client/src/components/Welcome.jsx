import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './mystyle.module.css';

function App () {
    const navigate = useNavigate()
    const ConferenceHeadLogin = () => {
        navigate('/ConferenceHeadLogin')
    }
    const AuthorLogin = () => {
        navigate('/AuthorLogin')
    }
    const ReviewerLogin = () => {
        navigate('/ReviewerLogin')
    }

    return (
        <div className={styles.body} >
            <button className={styles.butt} onClick = {ConferenceHeadLogin}>Admin Login</button>
            <br />
            <button className={styles.butt} onClick = {AuthorLogin}>Author Login</button>
            <br />
            <button className={styles.butt} onClick = {ReviewerLogin}>Reviewer Login</button>
            <br /> 
        </div>
    )
}

export default App
