const { create } = require('ipfs-http-client')
const express = require('express')
const fileupload = require('express-fileupload')
const cors = require('cors')
const fs = require('fs')

const app = express()

app.use(express.json())
app.use(cors())
app.use(fileupload())

async function createIpfs() {
    const ipfs = await create(
        {
            host:"ipfs.infura.io",
            port:"5001",
            protocol:"https"
        }
    )
    return ipfs
}


async function addFileToIpfs(File) {
    let ipfs = await createIpfs()
    let result = await ipfs.add({content:File})
    return result.path
}

app.listen(8888, () => {
    console.log('listening')
})

app.post('/Upload', async (req, res) => {
    let result
    let finalHash
    const file = req.files.file
    result=file.data.toString()
    const fileName = file.name  
    finalHash = await addFileToIpfs(result)
    res.send({'message':'Success','hash':finalHash})
})
