import React from 'react'
import { useState, useContext } from 'react';
import { useEffect } from 'react';
import Axios from 'axios'
import { JournalContext } from '../contexts/JournalContext';
import { useNavigate } from 'react-router-dom';


function JoinConference() {
    const navigate = useNavigate()
    const { Rid } = useContext(JournalContext)
    const [ConfList, setConfList] = useState([])
    const [selectedConfId, setSelectedConfId] = useState([])
    useEffect(() => {
        Axios.post("http://localhost:3001/GetConferenceList").then((response) => {
            if (response.data.message === 'Success') {
                setConfList(response.data.ConfList)
            }
        })
    })

    const checkReviewerCompatability = () => {
        console.log(ConfList[0])
        let i
        for (i = 0; i < ConfList.length; i++) {
            let confid = ConfList[i].confid.toString()
            console.log(typeof (confid))
            console.log(confid)
            if (confid === selectedConfId) {
                break
            }
        }
        console.log(i)
        let arr = ConfList[i].domains
        console.log(Rid)
        Axios.post("http://localhost:3001/GetReviewer", { reviewerid: Rid }).then((response) => {
            if (response.data.message === 'Success') {
                let i = 0
                let revdom = response.data.reviewer.domains
                for (let j = 0; j < arr.length; j++) {
                    for (let k = 0; k < revdom.length; k++) {
                        if (arr[j] === revdom[k]) {
                            i = i + 1
                        }
                    }
                }
                if (i == 0) {
                    alert('Reviewer not suitable for the conference')
                } else {
                    console.log(Rid)
                    Axios.post("http://localhost:3001/UpdateReviewerList", { reviewerid: Rid, confid: selectedConfId }).then((response) => {
                        if (response.data.message === 'Success') {
                            alert('Reviewer Added to Conference')
                            Axios.post("http://localhost:5555/addConferenceState",{Conf:response.data.Conf}).then((resp) => {
                                navigate('/ReviewerProfile')
                            })
                            
                        }
                    })
                }


            }

        })

    }
    return (
        <div className="ConferenceList">
            {ConfList.map((conf) => {
                return (
                    <h3>{conf.confid}. {conf.name}</h3>
                )
            })}
            <div>
                <label>Select Conference ID : </label>
                <input type="number" placeholder="0" onChange={(e) => { setSelectedConfId(e.target.value) }} />
                <button onClick={checkReviewerCompatability}>Submit</button>
            </div>
        </div>
    )
}

export default JoinConference
