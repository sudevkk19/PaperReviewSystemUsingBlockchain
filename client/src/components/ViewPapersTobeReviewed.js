import React,{useEffect, useState, useContext} from 'react'
import Axios from 'axios'
import { JournalContext } from '../contexts/JournalContext'
import {useNavigate} from 'react-router-dom'
function ViewPapersTobeReviewed () {
    const {RUname, setSelectedPaper, papers} = useContext(JournalContext)
    
    const navigate = useNavigate()

    const Submit = () => {
        navigate('/UploadReview')
    }

    return (
        <div>
            <br />
            <br />
            {papers.map((pap) => {
                return(
                    <div>
                        {pap}
                    </div>
                )
            })}

            <br />
            <br />
            <input type="number" placeholder="PaperID" onChange={(e) => {setSelectedPaper(e.target.value)}}/>
            <br />
            <button onClick={Submit}>Submit</button>
        </div>
    )

}

export default ViewPapersTobeReviewed