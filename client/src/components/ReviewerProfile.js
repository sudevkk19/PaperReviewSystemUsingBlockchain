import React from 'react'
import { useState, useContext, useEffect } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { JournalContext } from '../contexts/JournalContext'

function ReviewerProfile() {
    const { Rname, RUname, setRid, setReviewPaps, ReviewPaps, setPapers } = useContext(JournalContext)
    const navigate = useNavigate()
    useEffect(() => {
        Axios.post("http://localhost:3001/GetReviewerID", { username: RUname }).then((response) => {
            if (response.data.message === 'Success') {
                console.log(response.data.id)
                setRid(response.data.id)
            }
        })
    }, [])

    const JoinConference = () => {
        navigate('/JoinConference')
    }
    const ReviewPapers = async () => {
        await Axios.post("http://localhost:3001/GetPapersByReviewerUsername", { username: RUname }).then((response) => {
            console.log(response.data)
            var temp = [{ paper: response.data.paperlist[0], paperhash: response.data.paperhash[0] }]
            console.log(temp)
            setReviewPaps(temp)
            for (let i = 1; i < response.data.paperlist.length; i++) {
                var temp = { paper: response.data.paperlist[i], paperhash: response.data.paperhash[i] }
                var t2 = ReviewPaps.concat(temp)
                setReviewPaps(t2)
                console.log(t2)

            }
            console.log(ReviewPaps)
            navigate('/ReviewPapers')
        })
    }
    const UploadReviews = () => {
        Axios.post("http://localhost:3001/GetPapersByReviewerUsername", { username: RUname }).then((response) => {
            console.log(response.data.paperlist)
            setPapers(response.data.paperlist)
            navigate('/ViewPapersTobeReviewed')
        })
        
    }
    const Logout = () => {
        navigate('/')
    }

    return (
        <div className="ReviewerProfile">
            <h1>Welcome {Rname}</h1>
            <button onClick={JoinConference}>Join Conference</button>
            <br />
            <br />
            <button onClick={ReviewPapers}>Download Papers</button>
            <br />
            <br />
            <button onClick={UploadReviews}>Upload Reviews</button>
            <button onClick={Logout}>Logout</button>

        </div>

    )
}


export default ReviewerProfile
