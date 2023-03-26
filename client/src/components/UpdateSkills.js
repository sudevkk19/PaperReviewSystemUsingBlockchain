import { useNavigate } from "react-router-dom";
import { JournalContext } from "../contexts/JournalContext";
import { useContext, useEffect} from 'react'
import Axios from "axios";


function UpdateSkills () {
    const { Rname } = useContext(JournalContext)
    const [currSkills, setCurrSkills] = useState([])
    useEffect(() => {
        Axios.post("http://localhost:3001/getReviewerSkills", { username : Rname}).then((response))

    })

    return (
            <div className="Skills">
                
            </div>
        
    )




    
}


export default UpdateSkills