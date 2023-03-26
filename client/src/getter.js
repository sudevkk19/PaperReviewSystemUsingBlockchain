import Axios from 'axios'
import React from 'react'




function login () {

    const Gettesh = () => {
        Axios.get("http://localhost:3001/checkJournalbyUserName",{data: {username:"yo", password:"yo"}}).then((response) => {
        console.log(response.data)
        })

    }
    return(
        <div>
            <button onClick={Gettesh}> Get Request</button>
        </div>
    )
}


export default login