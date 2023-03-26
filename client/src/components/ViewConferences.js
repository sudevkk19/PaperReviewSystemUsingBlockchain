import Axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { JournalContext } from '../contexts/JournalContext'

function ViewConferences() {
    const { setSelectedConference } = useContext(JournalContext)
    const navigate = useNavigate()
    const [ConfList, setConfList] = useState([])
    const [selectedConfId, setSelectedConfId] = useState(0)
    useEffect(() => {
        Axios.post("http://localhost:3001/GetConferenceList").then((response) => {
            if (response.data.message === 'Success') {
                setConfList(response.data.ConfList)
            } else {
                alert("Error")
                navigate('/Welcome')
            }
        })
    })

    const Submit = () => {
        //navigate('/AddPaper')
        for(let i=0;i<ConfList.length;++i) {
            let confid = ConfList[i].confid.toString()
            if(confid === selectedConfId) {
                setSelectedConference(ConfList[i])
                break
            }
        }
        navigate('/AddPaper')
    }

    return (
        <div>
            <div>
                <ul>
                    {ConfList.map((conf) => {
                        return (
                            <li>{conf.confid}. {conf.name}</li>
                        )
                    })}
                </ul>

            </div>
            <br />
            <br />
            <label>Select the Conference:</label>
            <input type="number" placeholder="ConferenceID" onChange={(e)=> {setSelectedConfId(e.target.value)}} />
            <br />
            <br />
            <br />
            <button onClick={Submit}>Submit</button>
        </div>
    )

}

export default ViewConferences