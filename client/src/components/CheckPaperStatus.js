import Axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { JournalContext } from '../contexts/JournalContext'


function CheckPaperStatus() {
    const navigate = useNavigate()
    const { AUname } = useContext(JournalContext)
    const [papers, setPapers] = useState([])
    useEffect(() => {
        Axios.post("http://localhost:3001/GetAuthorIdbyUsername", { username: AUname }).then((response) => {
            Axios.post("http://localhost:3001/GetPapersByAuthorID", { AuthID: response.data.authid }).then((resp) => {
                setPapers(resp.data.papers)
            })
        })
    })

    const goback = () => {
        navigate('/AuthorProfile')

    }
    return (
        <div>
            <br />
            <br />
            <br />
            {papers.map((pap) => {
                return (
                    <div>
                        <h3>{pap.PaperId}. {pap.Name}</h3>
                        <h4>Status - {pap.Status}</h4>
                    </div>
                )
            })}
            <br />
            <button onClick={goback}>Go Back</button>
        </div>
    )




}

export default CheckPaperStatus