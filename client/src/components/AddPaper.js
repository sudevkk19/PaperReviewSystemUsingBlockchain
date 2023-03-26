import React from 'react'
import { useContext, useState } from 'react'
import { JournalContext } from '../contexts/JournalContext'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'

function AddPaper() {
    const navigate = useNavigate()
    const { AUname, setPaperid, selectedConference } = useContext(JournalContext)
    const [PaperName, setPapername] = useState("")
    const [file, setFile] = useState()
    const [fileHash, setFilehash] = useState('')
    const [PaperId, setPaperId] = useState()
    const [flag, setFlag] = useState(0)
    const [domain, setDomain] = useState('')
    const [domainList, setDomainlist] = useState([])
    let id
    Axios.post("http://localhost:3001/GetNextPaperID").then((response) => {
        if (response.data.message === 'Success') {
            id = response.data.id
            setPaperId(id + 1)
        }
    })

    const changeHandler = async (e) => {
        console.log(e.target.files[0])
        setFile(e.target.files[0])
    }

    const SubmitPaper = async (data) => {
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
                setFilehash(response.data.hash)
                setFlag(1)
            }
        })
        if (flag === 1) {
            console.log(AUname, fileHash, domainList)

            console.log(PaperId)
            await Axios.post("http://localhost:3001/AddPaper", { PaperID: PaperId,Name:PaperName, ConfID: selectedConference.confid, AuthorUsername: AUname, hash: fileHash, Domains: domainList }).then((response) => {
                if (response.data.message === 'Success') {
                    alert('Paper Successfully Submitted')
                    Axios.post("http://localhost:3001/UpdatePaperID").then((response) => {

                    })
                    Axios.post("http://localhost:5555/AddPaperState", { Paper: response.data.paper }).then((resp) => {
                        if (resp.data.message === 'Success') {
                            setPaperid(PaperId)
                            Axios.post("http://localhost:3001/UpdatePaperToConference", { ConfID: selectedConference.confid, PaperID: PaperId }).then((response) => {
                                if (response.data.message === 'Success') {
                                    alert('Update Successful')
                                    Axios.post("http://localhost:3001/GetConferenceDetails",{ConfID: selectedConference.confid}).then((response) => {
                                        if(response.data.message === 'Success') {
                                            console.log(response.data.conf)
                                            Axios.post("http://localhost:5555/addConferenceState",{Conf:response.data.conf[0]}).then((resp) => {})
                                        }
                                    })
                                    navigate('/AuthorProfile')

                                }
                            })
                        } else {
                            alert('Error')
                            navigate('/Welcome')
                        }
                    })


                }
            })
        }

    }
    const AddDomain = () => {
        let arr = domainList.concat(domain)
        setDomainlist(arr)
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
                <br />
                <label>Name of Paper : </label>
                <input type="text" placeholder="Name" onChange={(e) => {setPapername(e.target.value)}} />
                <label>Paper Domains: </label>
                <input type="text" placeholder="Domains" onChange={(e) => { setDomain(e.target.value) }} />
                <button onClick={AddDomain}>Add Domain</button>
                <br />
                {domainList.map((dom) => {
                    return (
                        <div>
                            <h4>{dom} </h4>
                        </div>
                    )
                })}
            </div>
            <br />
            <br />
            <button onClick={SubmitPaper}>Submit</button>

        </div >
    )
}


export default AddPaper