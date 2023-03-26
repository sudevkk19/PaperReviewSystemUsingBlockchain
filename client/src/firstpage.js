const { create } = require("ipfs-http-client")

async function createIpfs() {
    const ipfs = await create(
        {
            host:"ipfs.infura.io",
            port:"5005",
            protocol:"https"
        }
    )
    return ipfs
}


async function addTextToIpfs() {
    let ipfs = createIpfs()
    const result=await ipfs.add("YO")
    console.log(result)
}

addTextToIpfs()

