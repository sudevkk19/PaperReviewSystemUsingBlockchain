import React from 'react'
import './App.css';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom'

import {useForm} from 'react-hook-form'

import RegisterJournal from './components/RegisterJournal'
import Welcome from './components/Welcome'
import ConferenceHeadLogin from './components/ConferenceHeadLogin'
import { JournalContext } from './contexts/JournalContext'
import AdminProfile from './components/AdminProfile'
import AuthorLogin from './components/AuthorLogin';
import RegisterAuthor from './components/RegisterAuthor'
import AuthorProfile from './components/AuthorProfile'
import JoinConference from './components/JoinConference'
import ReviewerLogin from './components/ReviewerLogin'
import RegisterReviewer from './components/RegisterReviewer'
import Test from './getter'
import ReviewerProfile from './components/ReviewerProfile';
import AddPaper from './components/AddPaper'
import AddDomains from './components/AddDomains'
import HostConference from './components/HostConference'
import ViewConferences from './components/ViewConferences'
import UpdateConference from './components/UpdateConference'
import BeginReviewing from './components/BeginReviewing';
import UpdateBlockchain from './components/UpdateBlockchain';
import CheckPaperStatus from './components/CheckPaperStatus';
import ReviewPapers from './components/ReviewPapers'
import ViewPapersTobeReviewed from './components/ViewPapersTobeReviewed'
import UploadReview from './components/UploadReview';
import EndConference from './components/EndConference'


function App() {
  const [JUname, setJUname] = useState("")
  const [Aname, setAname] = useState("")
  const [AUname, setAUname] = useState("")
  const [Rname, setRname] = useState("")
  const [RUname, setRUname] = useState("")
  const [PaperId, setPaperid] = useState("")
  const [currPaperDomains, setCurrPaperDomains] = useState([])
  const [selectedConference, setSelectedConference] = useState({})
  const [ReviewConf, setReviewConf] = useState()
  const [Rid, setRid] = useState("")
  const [ReviewPaps, setReviewPaps] = useState([{}])
  const [ReviewPapsHash, setReviewPapsHash] = useState([])
  const [selectedPaper, setSelectedPaper] = useState()
  const [papers, setPapers] = useState([])


  return (
    <JournalContext.Provider value={{ Aname, setAname, AUname, setAUname, Rname, setRname, RUname, setRUname, PaperId, setPaperid, 
    currPaperDomains, setCurrPaperDomains, selectedConference, setSelectedConference, Rid, setRid,ReviewConf,setReviewConf
    ,ReviewPaps,setReviewPaps,ReviewPapsHash,setReviewPapsHash,selectedPaper, setSelectedPaper,papers, setPapers}}>
    <Router>
      <Routes>      
        <Route exact path = "/" element={<Welcome />} />
        <Route exact path = "/Welcome" element={<Welcome />} />
        <Route exact path = "/registerJournal" element={<RegisterJournal />} />
        <Route exact path = "/ConferenceHeadLogin" element={<ConferenceHeadLogin/>} />
        <Route exact path = "/AdminProfile" element={<AdminProfile />} />
        <Route exact path = "/authorLogin" element={<AuthorLogin />}/>
        <Route exact path = "/registerAuthor" element={<RegisterAuthor />}/>
        <Route exact path = "/AuthorProfile" element={<AuthorProfile/>} />
        <Route exact path = "/joinConference" element={<JoinConference/>} />
        <Route exact path = "/reviewerLogin" element={<ReviewerLogin/>} />
        <Route exact path = "/registerReviewer" element={<RegisterReviewer/>} />
        <Route exact path = "/ReviewerProfile" element={<ReviewerProfile/>} />
        <Route exact path = "/AddPaper" element={<AddPaper />} />
        <Route exact path = "/AddDomains" element={<AddDomains />} />
        <Route exact path = "/HostConference" element={<HostConference />} />
        <Route exact path = "/ViewConferences" element={<ViewConferences />} />
        <Route exact path = "/UpdateConference" element={<UpdateConference />} />
        <Route exact path = "/BeginReviewing" element={<BeginReviewing />} />
        <Route exact path = "/UpdateBlockchain" element={<UpdateBlockchain />} />
        <Route exact path = "/CheckPaperStatus" element={<CheckPaperStatus />} />
        <Route exact path = "/ReviewPapers" element={<ReviewPapers />} />
        <Route exact path = "/ViewPapersTobeReviewed" element={<ViewPapersTobeReviewed />} />
        <Route exact path = "/UploadReview" element={<UploadReview />} />
        <Route exact path = "/EndConference" element={<EndConference />} />
        <Route exact path = "/test" element={<Test/>} />
      </Routes>
    </Router>
    </JournalContext.Provider>
    
  );
}

export default App;
