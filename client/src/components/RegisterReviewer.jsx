import React from 'react'
import { useState } from 'react'
import Axios from 'axios'
import {
    useNavigate
} from 'react-router-dom'
import styles from '../css/style1.module.css';



function App() {

    const navigate = useNavigate()
  const [rname, setRName] = useState("")
  const [runame, setRUname] = useState("")
  const [rpassword, setRPassword] = useState("")
  const [domain, setDomain] = useState("")
  const [domainList, setDomainList] = useState([])
  const [Rid, setRid] = useState()
  
  Axios.post("http://localhost:3001/GetNextRevID").then((response) => {
    if(response.data.message === 'Success') {
      var id = response.data.id
      console.log(id)
      setRid(id+1)
    }
  })
  

  const AddDomain = () => {
    let arr=domainList.concat(domain)
    setDomainList(arr)
  }

  const createReviewer = () => {
    console.log(Rid)
    Axios.post("http://localhost:3001/createReviewer", {reviewerid:Rid, name: rname, username: runame, password: rpassword,domains:domainList, paperlist:[],paperhash:[]}).then((response) => {
      if(response.data.message === 'Success') {
        alert("Reviewer Created!")
        Axios.post("http://localhost:3001/UpdateRevID").then((response) => {})
        navigate('/Welcome')
      }
      
    })
  }

  return (
    <div >
      <div>
        <input type="text" placeholder="Name" onChange={(event) => {setRName(event.target.value) }}/>
        <br />
        <br />
        <input type="username" placeholder="UserName" onChange={(event) => {setRUname(event.target.value)}}/>
        <br />
        <br />
        <input type="password" placeholder="Password" onChange={(event) => {setRPassword(event.target.value)}}/>
        <br />
        <br />
        <div>
          <label>Reviewer Domains : </label>
          <input type="text" placeholder="Domain" onChange={(e) => {setDomain(e.target.value)}} />
          <button onClick={AddDomain}>Add Domain</button>
          <br />
          {domainList.map((dom) => { 
            return(
              <h3>{dom}</h3>
            )
          })}
        </div>
        <button className={styles.btn} onClick={createReviewer}> Submit </button>
      </div>
    </div>
    
  );
}

export default App;
