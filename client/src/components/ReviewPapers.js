import React,{useState, useContext, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import { JournalContext } from '../contexts/JournalContext'
import Axios from 'axios'

function ReviewPapers () {
    const navigate = useNavigate()
    const [paperlinks, setPaperlinks] = useState([])
    const {RUname,ReviewPaps} = useContext(JournalContext)
    useEffect(()=> {
        console.log(ReviewPaps)
        var link = [{paperid: ReviewPaps[0].paper,paperlink:"https://ipfs.io/ipfs/"+ReviewPaps[0].paperhash}]
        console.log(link)
        setPaperlinks(link)
        for(let i = 1; i < ReviewPaps.length ; i++) {
            var link = "https://ipfs.io/ipfs/"+ReviewPaps[i].paperhash
            var arr = paperlinks.concat(link)
            setPaperlinks(arr)
            console.log(link)
        }
        console.log(paperlinks)
    },[])
    const goback = () => {
        navigate('/ReviewerProfile')
    }

    return (
        <div>
            <div>
            {paperlinks.map((pap) => {
                return(
                    <a href={pap.paperlink}>{pap.paperid} - {pap.paperlink}</a>
                )
            })
                
            }

                
            </div>
            <br />
            <br />
            <button onClick={goback}>Go Back</button>
        </div>
    )
}

export default ReviewPapers
