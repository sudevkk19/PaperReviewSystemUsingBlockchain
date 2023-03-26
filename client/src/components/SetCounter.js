import React from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'

async function setCounters() {
    const navigate = useNavigate()
    const setcounter = () => {
        Axios.post("http://localhost:3001/SetCounters").then((response) => {
            if (response.data.message === 'Success') {
                navigate('/Welcome')
            }
        })
    }
    return (
        <div>
            <button onClick={setcounter} >Set Counters</button>
        </div>
    )
}

export default setCounters