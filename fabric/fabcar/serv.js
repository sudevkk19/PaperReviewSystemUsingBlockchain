
var express=require('express');
var cors = require('cors')
var { exec }=require('child_process')
var app=express()
app.use(express.json())
app.use(cors())
const port = 5555
app.get('/',(req,res)=>
{
    exec("node query.js ", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
    res.send()
})

app.get('/createPaper',(req,res)=>
{
    exec("node createPaper.js ", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
    console.log(cmd)
    res.send({'message':'Success'})
})

app.post('/addConferenceState', async(req, res) => {
    
    console.log(req.body.Conf)
    var cmd = "go run addConferenceState.go " + req.body.Conf.confid+" "+req.body.Conf.name+" ["+req.body.Conf.domains+"] "+req.body.Conf.phase+" ["+req.body.Conf.PaperList+"] ["+req.body.Conf.ReviewerList+"]"
    console.log(cmd)
    await exec(cmd, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    })
    res.send({'message':'Success'})
})

app.post('/addPaperState', async(req, res) => {
    /*PaperID string `json:"paperid"`
	AuthorID string `json:"authorid"`
	ConfID string `json:"confid"`
	PaperName string `json:"name"`
	PaperHash string `json:"hash"`
	PaperDomains string `json:"paperdomains"`
	PaperReviewerIndex string `json:"paperreviewerindex"`
	PaperReviewerScore string `json:"paperreviewerscore"`
	PaperReviewHash string `json:"paperreviewhash"`
	PaperStage string `json:"paperstage"`
	PaperResult string `json:"paperreviewers"`*/
    console.log(req.body)
    var cmd = "go run addPaperState.go "+ req.body.Paper.PaperId +" "+ req.body.Paper.AuthorID+" "+
    req.body.Paper.ConfID+" "+req.body.Paper.Name+" "+req.body.Paper.Hash+" ["+req.body.Paper.Domains+"] ["+req.body.Paper.ReviewerIndex+"] ["+req.body.Paper.ReviewerScore+"] ["+req.body.Paper.ReviewHash+"] "+req.body.Paper.Status+" "+req.body.Paper.Result 

    console.log(cmd)
    await exec(cmd, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    })
    res.send({'message':'Success'})
})

app.listen(port, ()=>
{
    console.log("Connected to port ", port)
})