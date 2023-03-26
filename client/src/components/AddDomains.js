import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { JournalContext } from '../contexts/JournalContext'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'


function AddDomain () {
    const navigate = useNavigate()
    const {PaperId} = useContext (JournalContext)
    const [currDomains, setCurrdomains] = useState([])
    const [AddDomain, setAddDomain] = useState('')
    let arr

    const DomainAdder = () => {
        console.log(currDomains)
        arr = currDomains.concat(AddDomain)
        setCurrdomains(arr)
        console.log(arr)
    }

    const SubmitDomains = () => {
         console.log(currDomains)
         Axios.post("http://localhost:3001/UpdatePaperDomain",{Domains:currDomains,pid:PaperId}).then((response) => {
            if(response.data.message === 'Success') {
                alert('Added Domains')
                navigate('/AuthorProfile')
            }
            else {
                alert('Error')
            }
        })
    }

    return ( 
        <div>
            <div className='listofdomains'>
                {currDomains.map((domain) => {
                    return(
                    <div>
                        <h3>{domain}</h3>
                        <br />
                    </div>
                    )
                })}
            </div>
            <br />
            <input type="text" placeholder="Domain" onChange={(e)=>{setAddDomain(e.target.value)}}/>
            <button onClick={DomainAdder}>Add Domain</button>
            <br />
            <br />
            <button onClick={SubmitDomains}>Submit</button>
            <h2>{AddDomain}</h2>
        </div>
    )
}

export default AddDomain