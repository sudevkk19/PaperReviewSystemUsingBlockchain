import React, {useState, useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import { JournalContext } from '../contexts/JournalContext'
import Axios from 'axios'

function UpdateConference () {
    const navigate = useNavigate()
    const {selectedConference, PaperId} = useContext(JournalContext)
    Axios.post("http://localhost:3001/UpdatePaperToConference",{ConfID:selectedConference.confid, PaperID: PaperId}).then((response) => {
        if(response.data.message === 'Success') {
            alert('Update Successful')
            navigate('/AuthorProfile')

        }
    })

}

export default UpdateConference