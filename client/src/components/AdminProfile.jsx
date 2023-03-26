import React from 'react'
import { useState, useContext } from 'react'
import { JournalContext } from '../contexts/JournalContext'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'

function AdminProfile() {
    const navigate = useNavigate()
    
    const HostConference = () => {
        navigate('/HostConference')        
    }
    

    const BeginReviewingPhase = () => {
        navigate('/BeginReviewing')

    }

    const EndConference = () => {
        navigate('/EndConference')
    }

    const LogoutProfile = () => {
        navigate('/Welcome')
    }
        return (
            <div className="Profile" >
                <h1 >Welcome Admin</h1>
                <br />
                <button onClick={HostConference}>Host a Conference</button>
                <br />
                <br />
                <button onClick={BeginReviewingPhase}>Begin Reviewing Phase</button>
                <br />
                <br />
                <button onClick={EndConference}>End Conference</button>
                <br />
                <br />
                <button onClick={LogoutProfile}>Logout</button>
                <br />
            </div>
        )
    
    
}

export default AdminProfile
