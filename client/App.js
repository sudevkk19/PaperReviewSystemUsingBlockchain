import './App.css';
import { useState,useEffect } from 'react'
import Axios from 'axios'

function App() {
  const [listofJournals, setListofJournals] = useState( [ { id: 1, name: "Sud" }])
  const [name, setName] = useState[""]

  useEffect( () => {
    Axios.get("http://localhost:3001/getJournals").then((response) => {
      setListofJournals(response.data)
    })
  }, [])

   const createJournal = () => {
     Axios.post("http://localhost:3001/createJournal", {name}).then((response) => {
       alert("Journal Created")
     })
   } 
  return (
    <div className="App">
      <div className="journalNames">
        {listofJournals.map((user) => {
          return(
          <div>
            <h3>Name: {user.name}</h3>
          </div>
          )
        })

        }
      </div>


      <div>
        <input type="text" placeholder="Name" onChange={(event) => {setName(event.target.value)}}/>
        <button onClick={createJournal}> Submit </button>
      </div>
    </div>

    
  );
}

export default App;
