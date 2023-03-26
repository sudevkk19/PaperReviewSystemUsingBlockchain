import Axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


function HostConference() {
    const navigate = useNavigate()
    const [ConfName, setConfName] = useState('')
    const [domain, setDomain] = useState('')
    const [domainList, setDomainList] = useState([])
    const [ConfId, setConfId] = useState()
    let arr
    let id
    Axios.post("http://localhost:3001/GetNextConfID").then((response) => {
        if (response.data.message === 'Success') {
            id = response.data.id
            setConfId(id + 1)
        }
    })

    const AddDomain = () => {
        arr = domainList.concat(domain)
        setDomainList(arr)

    }

    const Submit = () => {
        Axios.post("http://localhost:3001/HostConference", { name: ConfName, id: ConfId, domains: domainList }).then((response) => {
            if (response.data.message === 'Success') {
                Axios.post("http://localhost:3001/UpdateConfID").then((response) => {
                    if (response.data.message === 'Success') {
                        alert('Conference Successfully Hosted!')
                    }
                })
                console.log(response.data.conf)
                Axios.post("http://localhost:5555/addConferenceState", { Conf: response.data.conf }).then((resp) => {
                    if (resp.data.message === 'Success')
                        navigate('/AdminProfile')
                })
            } else {
                alert('GG')
                navigate('/Welcome')
            }
        })
    }


return (
    <div>
        <h1>Welcome Admin</h1>
        <br />
        <br />
        <label>Name:</label>
        <input type="text" placeholder="Name of Conference" onChange={(e) => setConfName(e.target.value)} />
        <br />
        <br />
        <div>
            <label>Domain: </label>
            <input type="text" placeholder="Domain" onChange={(e) => setDomain(e.target.value)} />
            <button onClick={AddDomain}>Add Domain</button>
            <br />
            {domainList.map((domain) => {
                return (
                    <div>
                        <h6>{domain} </h6>
                    </div>
                )
            })}
        </div>
        <br />
        <button onClick={Submit}>Host Conference</button>

    </div>
)

}

export default HostConference