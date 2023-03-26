const express = require("express")
const app = express()
const mongoose = require("mongoose")
const JournalModel = require('./models/Journal')
const AuthorModel = require('./models/Author.js')
const ReviewerModel = require('./models/Reviewer')
const ActiveConferenceList = require('./models/ActiveConferenceList')
const cors = require('cors')
const ConferenceList = require("./models/ConferenceList")
const Papers = require("./models/Papers")
const Counter = require("./models/Counter")

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://sud:sud@cluster0.yueuz.mongodb.net/PRS?retryWrites=true&w=majority")



app.post("/SetCounters", async (req, res) => {
    const counters = { ConfID: 0, AuthID: 0, RevID: 0, PaperID: 0 }
    const newCounter = new Counter(counters)
    await newCounter.save()
    res.send({ 'message': 'Success' })
})

app.post("/GetNextPaperID", async (req, res) => {
    const curr = await Counter.where("")
    console.log(curr)
    if (curr.length) {
        res.send({ 'message': 'Success', 'id': curr[0].PaperID })
    } else {
        res.send({ 'message': 'error' })
    }
})



app.post("/GetNextAuthID", async (req, res) => {
    const curr = await Counter.where("")
    console.log(curr)
    if (curr.length) {
        res.send({ 'message': 'Success', 'id': curr[0].AuthID })
    } else {
        res.send({ 'message': 'error' })
    }
})

app.post("/GetNextConfID", async (req, res) => {
    const curr = await Counter.where("")
    if (curr.length) {
        res.send({ 'message': 'Success', 'id': curr[0].ConfID })
    } else {
        res.send({ 'message': 'error' })
    }
})

app.post("/GetNextRevID", async (req, res) => {
    const curr = await Counter.where("")
    if (curr.length) {
        res.send({ 'message': 'Success', 'id': curr[0].RevID })
    } else {
        res.send({ 'message': 'error' })
    }
})

app.post("/UpdatePaperID", async (req, res) => {
    const curr = await Counter.where("")
    if (curr.length) {
        curr[0].PaperID = curr[0].PaperID + 1
        await curr[0].save()
        res.send({ 'message': 'Success' })
    } else {
        res.send({ 'message': 'error' })
    }
})


app.post("/UpdateAuthID", async (req, res) => {
    const curr = await Counter.where("")
    if (curr.length) {
        curr[0].AuthID = curr[0].AuthID + 1
        await curr[0].save()
        res.send({ 'message': 'Success' })
    } else {
        res.send({ 'message': 'error' })
    }
})

app.post("/UpdateConfID", async (req, res) => {
    const curr = await Counter.where("")
    if (curr.length) {
        curr[0].ConfID = curr[0].ConfID + 1
        await curr[0].save()
        res.send({ 'message': 'Success' })
    } else {
        res.send({ 'message': 'error' })
    }
})

app.post("/UpdateRevID", async (req, res) => {
    const curr = await Counter.where("")
    if (curr.length) {
        curr[0].RevID = curr[0].RevID + 1
        await curr[0].save()
        res.send({ 'message': 'Success' })
    } else {
        res.send({ 'message': 'error' })
    }
})


app.post("/checkAdminName", (req, res) => {
    const { username, password } = req.body
    if (username === 'admin' && password === 'admin123') {
        res.json({ 'message': 'Success' })
    }
    else {
        res.json({ 'message': 'Error' })
    }
})


app.post("/checkAuthorByUserName", async (req, res) => {
    const auths = await AuthorModel.where("username").equals(req.body.username).where("password").equals(req.body.password)
    if (auths.length) {
        res.json({ 'message': 'Success', 'name': auths[0].name })
    }
    else {
        res.json({ 'message': 'Error' })
    }
})

app.post("/checkReviewerByUserName", async (req, res) => {
    const auths = await ReviewerModel.where("username").equals(req.body.username).where("password").equals(req.body.password)
    if (auths.length) {
        res.json({ 'message': 'Success', 'name': auths[0].name })
    }
    else {
        res.json({ 'message': 'Error' })
    }
})

app.post('/GetReviewerID', async (req, res) => {
    console.log(req.body)
    const rev = await ReviewerModel.where("username").equals(req.body.username)
    console.log(rev[0].reviewerid)
    res.send({ 'message': 'Success', 'id': rev[0].reviewerid })
})

app.post('/UpdateConferencePhase', async (req, res) => {
    const conf = await ConferenceList.where("confid").equals(req.body.confid)
    conf[0].phase = conf[0].phase + 1
    await conf[0].save()
    console.log(conf[0])
    res.send({ 'message': 'Success', 'Conf': conf[0] })
})

app.post('/EvaluatePaperResults',async(req, res) => {
    const paplist = req.body.paperlist
    for(let i = 0; i < paplist.length ; i++) {
        const paper = await Papers.where("PaperId").equals(paplist[i])
        console.log(paper)
        let zcount = 0
        let ocount = 0
        for(let j = 0 ; j < paper[0].ReviewerScore.length ; j++) { 
            if( paper[0].ReviewerScore[j] === 0) { 
                zcount ++ 
            } else {
                ocount ++
            }
        }
        if( zcount < ocount ) {
            paper[0].Result = "Accepted"
        } else {
            paper[0].Result = "Rejected"
        }
        paper[0].Status = "ReviewCompleted"
        await paper[0].save()
    }
    res.send({'message':'Success'})
})

app.post("/GetConferenceList", async (req, res) => {
    const conf = await ConferenceList.where("phase").equals(0)
    if (conf.length) {
        res.json({ 'message': 'Success', 'ConfList': conf })
    }

    else {
        res.json({ 'message': 'NotAvailable' })
    }
})

app.post('/UploadReview', async (req, res) => {
    console.log(req.body)
    const paper = await Papers.where("PaperId").equals(req.body.paperid)

    paper[0].ReviewerScore[req.body.pos] = req.body.decision
    paper[0].ReviewHash[req.body.pos] = req.body.reviewhash
    await paper[0].save()
    res.send({ 'message': 'Success' })
})


app.post('/GetHashbyPaperID', async (req, res) => {
    const paper = await Papers.where("PaperId").equals(req.body.paperid)
    res.send({ 'message': 'Success', 'hash': paper[0].Hash })
})

app.post('/GetAuthorIDbyUsername', async (req, res) => {
    const username = req.body.username
    const author = await AuthorModel.where("username").equals(username)
    res.send({ 'message': 'Success', 'authid': author[0].authid })
})

app.post('/GetPapersByAuthorID', async (req, res) => {
    const papers = await Papers.where("AuthorID").equals(req.body.AuthID)
    res.send({ 'message': 'Success', 'papers': papers })
})

app.post('/GetPapersByReviewerUsername', async (req, res) => {
    const rev = await ReviewerModel.where("username").equals(req.body.username)
    res.send({ 'message': 'Success', 'paperlist': rev[0].paperlist, 'paperhash': rev[0].paperhash })
})

app.post("/CheckForPaperAlreadyAdded", async (req, res) => {
    const username = req.body.username
    const paper = await Papers.where("AuthorID").equals(username)
    if (paper.length) {
        res.send({ 'message': 'Submitted' })
    } else {
        res.send({ 'message': 'NotSubmitted' })
    }
})

app.post("/UpdatePaperToConference", async (req, res) => {
    const conf = await ConferenceList.where("confid").equals(req.body.ConfID)
    conf[0].PaperList.push(req.body.PaperID)
    await conf[0].save()
    res.send({ 'message': 'Success' })
})

app.post("/AddPaper", async (req, res) => {
    console.log(req.body)
    const authuser = req.body.AuthorUsername
    const hash = req.body.hash
    const auth = await AuthorModel.where("username").equals(authuser)
    const Paper = { PaperId: req.body.PaperID, Name:req.body.Name, AuthorID: auth[0].authid, ConfID: req.body.ConfID, Hash: hash, Domains: req.body.Domains, ReviewerIndex:[], ReviewerScore:[], ReviewHash:[], Status: "Submitted", Result:"NotApplicable" }
    const createPaper = new Papers(Paper)
    await createPaper.save()
    res.send({ 'message': 'Success', 'paper': Paper })
})

app.post("/getDomainOfPaper", async (req, res) => {
    const paperid = req.body.PaperId
    const domains = await Papers.where("id").equals(paperid)
    res.send({ 'domains': domains[0].Domains })
})

app.post("/GetConferenceDetails", async (req, res) => {
    const Conf = await ConferenceList.where("confid").equals(req.body.ConfID)
    console.log(Conf)
    res.send({ 'message': 'Success', conf: Conf })
})

app.post("/UpdatePaperDomain", async (req, res) => {
    console.log(req.body)
    const domains = req.body.Domains
    const paperid = req.body.pid
    console.log(domains, paperid)
    const paper = await Papers.where("id").equals(paperid)
    console.log(paper[0])
    paper[0].Domains = domains
    await paper[0].save()
    res.send({ 'message': 'Success' })

})

app.post('/GetPaperListOfReviewer', async (req, res) => {
    console.log(req.body)
    const rev = await ReviewerModel.where("reviewerid").equals(req.body.reviewerid)
    res.send({ 'message': 'Success', 'paperlist': rev[0].paperlist, 'paperhash': rev[0].paperhash })
})

app.post('/SetPaperListOfReviewer', async (req, res) => {
    console.log(req.body)
    const rev = await ReviewerModel.where("reviewerid").equals(req.body.reviewerid)
    rev[0].paperlist = req.body.paperlist
    rev[0].paperhash = req.body.paperhash
    await rev[0].save()
    res.send({ 'message': 'Success' })
})

app.post('/GetConferencesInReviewPhase', async(req, res) => {
    const conflist = await ConferenceList.where("phase").equals(1)
    console.log(conflist)
    res.send({'message':'Success', 'conflist':conflist})
})

app.post('/ChangeStatusToInReview', async (req, res) => {
    console.log(req.body)
    const arrpap = req.body.PaperIdArr
    for (let i = 0; i < arrpap.length; i++) {
        const pap = await Papers.where("PaperId").equals(arrpap[i])
        console.log(pap)
        pap[0].Status = "InReview"
        await pap[0].save()
        console.log(pap[0])
    }
    res.send({ 'message': 'Success' })
})

app.post('/SetReviewerToPaper', async (req, res) => {
    console.log(req.body)
    const pap = await Papers.where("PaperId").equals(req.body.paperid)
    pap[0].ReviewerIndex.push(req.body.reviewerid)
    pap[0].ReviewerScore.push(0)
    pap[0].ReviewHash.push('')
    await pap[0].save()
    console.log(pap[0])
    res.send({ 'message': 'Success' })
})

app.post('/GetReviewerlistFromPaperID', async (req, res) => {
    const pap = await Papers.where("PaperId").equals(req.body.paperid)
    res.send({ 'revlist': pap[0].ReviewerIndex })
})

app.post('/GetReviewer', async (req, res) => {
    const rev = await ReviewerModel.where("reviewerid").equals(req.body.reviewerid)
    res.send({ 'message': 'Success', 'reviewer': rev[0] })
})

app.post('/GetDomainOfReviewer', async (req, res) => {
    const rev = await ReviewerModel.where("reviewerid").equals(req.body.reviewerid)
    res.send({ 'message': 'Success', 'domains': rev[0].domains })
})

app.post("/createAuthor", async (req, res) => {
    const Author = req.body
    const newA = new AuthorModel(Author)
    await newA.save()

    res.send({ 'message': 'Success' })
})

app.post("/createReviewer", async (req, res) => {
    const Reviewer = req.body
    console.log(req.body)
    const newR = new ReviewerModel(Reviewer)
    await newR.save()

    res.send({ 'message': 'Success' })
})


app.post("/HostConference", async (req, res) => {
    const Conf = { confid: req.body.id, name: req.body.name, domains: req.body.domains, phase: 0, PaperList: [], ReviewerList: [] }
    const newConf = new ConferenceList(Conf)
    await newConf.save()
    console.log(Conf)
    res.send({ 'message': 'Success', 'conf': Conf })
})

app.post("/UpdatePaperList", async (req, res) => {
    const Conf = req.body
    const Conference = await ConferenceList.where("")
    Conference[0].PaperList = Conf.PaperList
    res.json(Conference)
})

app.post('/UpdateReviewerList', async (req, res) => {
    console.log(req.body)
    const conf = await ConferenceList.where("confid").equals(req.body.confid)
    conf[0].ReviewerList.push(req.body.reviewerid)
    await conf[0].save()
    res.send({ 'message': 'Success', 'Conf': conf[0] })
})

app.post("/RemovingConference", async (req, res) => {
    ConferenceList.deleteOne({ username: req.body.username }, (err, result) => { })
    const newConf = new ActiveConferenceList(req.body)
    await newConf.save()
    res.json(1)
})

app.listen(3001, () => {
    console.log("Server running on port 3001 ")
})
