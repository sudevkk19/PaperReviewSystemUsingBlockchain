import React from 'react'
import { useState,useContext,useEffect } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { JournalContext } from '../contexts/JournalContext'


function AuthorProfile () {   
    const {Aname} = useContext(JournalContext)
    const navigate= useNavigate()
    const AddPaper = () => {       
        navigate('/ViewConferences')
    }
    const CheckPaperStatus = () => {
        navigate('/CheckPaperStatus')
    }
    const Logout = () => {
        navigate('/Welcome')
    }

    return (
       <div className="AuthorProfile">     
            <h1>Welcome {Aname} </h1>      
            <br />
            <br />
            <button onClick={AddPaper}>Add Paper to Conference</button>
            <br />
            <br />
            <button onClick={CheckPaperStatus}>Check Status of Papers</button>
            <br />
            <br />
            <button onClick={Logout}>Logout</button>
            
        </div>

    )
}


export default AuthorProfile
