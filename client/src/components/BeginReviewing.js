import Axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { JournalContext } from '../contexts/JournalContext'


function BeginReviewing() {
    const {ReviewConf,setReviewConf} = useContext(JournalContext)
    const navigate = useNavigate()
    const [ConfList, setConfList] = useState([])
    const [currConference, setCurrConference] = useState()


    useEffect(() => {
        Axios.post("http://localhost:3001/GetConferenceList").then((response) => {
            if (response.data.message === 'Success') {
                setConfList(response.data.ConfList)
            }
        })
    })

    const Submit = () => {
        Axios.post("http://localhost:3001/UpdateConferencePhase", { confid: currConference }).then((response) => {
            if (response.data.message === 'Success') {
                var paperlist = response.data.Conf.PaperList
                var reviewerlist = response.data.Conf.ReviewerList
                Axios.post("http://localhost:3001/ChangeStatusToInReview", { PaperIdArr: paperlist }).then((response) => {
                })
                
                console.log(paperlist)
                console.log(reviewerlist)
                let count
                for (let i = 0; i < paperlist.length; i++) {
                    Axios.post("http://localhost:3001/GetDomainOfPaper", { PaperId: paperlist[i] }).then((response) => {
                        console.log(response.data.domains.length)
                        for (let j = 0; j < reviewerlist.length; j++) {
                            Axios.post("http://localhost:3001/GetDomainOfReviewer", { reviewerid: reviewerlist[j] }).then((resp) => {
                                console.log(resp.data.domains)
                           
                            count = 0
                            for (let k = 0; k < response.data.domains.length; k++) {
                                console.log(response.data.domains[k])
                                for (let l = 0; l < resp.data.domains.length; l++) {
                                    if (response.data.domains[k] === resp.data.domains[l]) {
                                        count = count + 1
                                    }
                                }

                            }
                            console.log(count)
                        
                            if (count > 0) {
                                console.log('gege')
                                Axios.post("http://localhost:3001/GetPaperListOfReviewer", { reviewerid: reviewerlist[j] }).then((res) => {
                                    var arr1 = res.data.paperlist
                                    var arr2 = res.data.paperhash
                                    arr1.push(paperlist[i])
                                    console.log(arr1)
                                    Axios.post("http://localhost:3001/GetHashbyPaperID",{paperid: paperlist[i]}).then((res) => {
                                        arr2.push(res.data.hash)
                                        console.log(arr2)
                                    
                                    Axios.post("http://localhost:3001/SetPaperListOfReviewer", { reviewerid: reviewerlist[j], paperlist: arr1, paperhash: arr2 }).then((response) => {
                                        if(response.data.message === 'Success') {
                                        }

                                    })
                                })
                                })
                                Axios.post("http://localhost:3001/SetReviewerToPaper", { reviewerid: reviewerlist[j], paperid: paperlist[i] }).then((response) => {

                                })
                            
                            }
                        })
                        }
                    })

                }    


            }
        })

        Axios.post("http://localhost:3001/GetConferenceDetails",{ConfID:ReviewConf}).then((response) => {
        if(response.data.message === 'Success') {
            console.log(response.data.conf[0])
            Axios.post("http://localhost:5555/addConferenceState",{Conf:response.data.conf[0]}).then((resp) => {
                
           })
        }
    })

        alert('Initiated Review Phase')
        navigate('/AdminProfile')
        

    }

    const Update = (e) => {
        setCurrConference(e.target.value)
        setReviewConf(e.target.value)
    }

    return (
        <div>
            <div>
                {ConfList.map((conf) => {
                    return (
                        <h2>{conf.confid}. {conf.name}</h2>
                    )
                })}
            </div>
            <br />
            <br />
            <div>
                <label>Select Conference : </label>
                <input type="Number" placeholder="ConferenceID" onChange={ Update } />
                <br />
                <br />
                <button onClick={Submit} >Submit</button>
            </div>
        </div>
    )
}

export default BeginReviewing