import React, { useEffect,useState,useContext } from 'react'
import Axios from 'axios'
import { JournalContext } from '../contexts/JournalContext'
import {useNavigate} from 'react-router-dom'

function EndConference () {
    const [confList, setConflist] = useState([])
    const {selectedConference, setSelectedConference } = useContext(JournalContext)
    const navigate = useNavigate()

    useEffect(() => {
        Axios.post("http://localhost:3001/GetConferencesInReviewPhase").then((response) => {
            if(response.data.message === 'Success') {
                setConflist(response.data.conflist)
            }
        })
    },[])

    const EndConf = () => {
        Axios.post("http://localhost:3001/UpdateConferencePhase",{confid:selectedConference}).then((response) => {
            if(response.data.message === 'Success') {
                Axios.post("http://localhost:3001/EvaluatePaperResults",{paperlist:response.data.Conf.PaperList}).then((resp) => {
                    if(resp.data.message === 'Success') {
                        alert('Conference Ended')
                        navigate('/AdminProfile')
                    }   
                })
            }
        })
    }

    return(
        <div>
            <br />
            <br />
            {confList.map((conf) => {
                return(
                    <h2>{conf.confid} - {conf.name}</h2>
                )
            })}
            <br />
            <input type="number" placeholder="ConferenceID" onChange={(e) => {setSelectedConference(e.target.value)}} />
            <br />
            <br />
            <button onClick={EndConf}>End Conference</button>
        </div>
    )
}

export default EndConference