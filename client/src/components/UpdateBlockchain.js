import React,{useContext, useState} from 'react'
import { JournalContext } from '../contexts/JournalContext'
import Axios from 'axios'
import { useNavigate} from 'react-router-dom'

function UpdateBlockchain () {
    const navigate = useNavigate()
    const {ReviewConf} = useContext(JournalContext)
    const [Conf, setConf] = useState([])
    Axios.post("http://localhost:3001/GetConferenceDetails",{ConfID:ReviewConf}).then((response) => {
        if(response.data.message === 'Success') {
            setConf(response.data.conf)
            console.log(response.data.conf[0])
            Axios.post("http://localhost:5555/addConferenceState",{Conf:response.data.conf[0]}).then((resp) => {
                
           })
        }
    })
    navigate('/AdminProfile')
}


export default UpdateBlockchain