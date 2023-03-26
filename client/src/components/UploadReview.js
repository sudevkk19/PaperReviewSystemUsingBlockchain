import Axios from 'axios'
import React, { useContext, useState } from 'react'
import { JournalContext } from '../contexts/JournalContext'
import { useNavigate } from 'react-router-dom'

function UploadReview() {
    const { selectedPaper, RUname } = useContext(JournalContext)
    const [result, setResult] = useState()
    const [file, setFile] = useState()
    const [fileHash, setFilehash] = useState('')
    const [Flag, setFlag] = useState(0)
    const navigate = useNavigate()

    const changeHandler = async (e) => {
        console.log(e.target.files[0])
        setFile(e.target.files[0])
    }

    const SubmitReview = async (data) => {
        data.preventDefault()
        const formData = new FormData()
        console.log(file.name)
        formData.append('file', file)
        console.log(formData)
        await Axios.post("http://localhost:8888/Upload", formData, {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }).then((response) => {
            if (response.data.message === 'Success') {
                console.log(response.data.hash)
                setFilehash(response.data.hash)
                setFlag(1)
                let rid
                Axios.post("http://localhost:3001/GetReviewerID", { username: RUname }).then((resp) => {
                    rid = resp.data.id
                    console.log(rid)
                Axios.post("http://localhost:3001/GetReviewerlistFromPaperID", { paperid: selectedPaper }).then((res) => {
                    for (let i = 0; i < res.data.revlist.length; i++) {
                        if (res.data.revlist[i] === rid) {
                            Axios.post("http://localhost:3001/UploadReview", { pos: i, decision: result, reviewhash: response.data.hash, paperid: selectedPaper }).then((res) => {
                                if (res.data.message === 'Success') {
                                    alert('Review Uploaded')
                                    navigate('/ReviewerProfile')
                                }
                            })
                        }
                    }
                })
                })
            }
        })
      
    }

    return (
        <div>
            <form>
                <h1>Upload Paper</h1>
                <input type="file" name="file" onChange={changeHandler} />
                <br />
                <br />
            </form>
            <div>
                <label>Declare your result: </label>
                <input type="number" min={0} max={1} placeholder="0 or 1" onChange={(e) => { setResult(e.target.value) }} />

                <br />
                <button onClick={SubmitReview}>Submit</button>

            </div >
        </div>
    )


}

export default UploadReview