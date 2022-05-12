const fs = require('fs')
const promisify = require('util').promisify


writeData = async(result)=>{
    await promisify(fs.writeFile)('./CleanseData/cleansedData', JSON.stringify(result, null, 2));
}

cleanseData = async(data)=>{
    let ecs = []
    console.log(data.length, '================= data length =================')
    await data.forEach((ec, index) => {
        let pairingKey = ec.googlePairingKey
        let accId = ec.awsAccountId
            if(ec.googlePairingKey){
                ec.cloudAccountId= pairingKey || ''
                delete ec['googlePairingKey']
                delete ec['awsAccountId']
                ecs.push(ec)
                return
            } else if(ec.awsAccountId){
                ec.cloudAccountId = accId || ''
                delete ec['googlePairingKey']
                delete ec['awsAccountId']
                ecs.push(ec)
                return
            }else{
                delete ec['googlePairingKey']
                delete ec['awsAccountId']
                if(!ec['cloudAccountId']){
                    ec.cloudAccountId = ''
                }else{
                }
                ecs.push(ec)
                return
            }
        // if (ec.hasOwnProperty('googlePairingKey') && pairingKey && pairingKey !== ec.cloudAccountId) {
        //     delete ec['googlePairingKey']
        //     ec.cloudAccountId = pairingKey
        //     ecs.push(ec)
        //     return
        // } else if (ec.hasOwnProperty('awsAccountId') && accId && accId !== ec.cloudAccountId) {
        //     delete ec['awsAccountId']
        //     ec.cloudAccountId = accId
        //     ecs.push(ec)
        //     return
        // } else if(ec.hasOwnProperty('googlePairingKey')){
        //
        //     ecs.push(ec)
        //     return
        // }else if(ec.hasOwnProperty('awsAccountId')){
        //     delete ec['awsAccountId']
        //     ecs.push(ec)
        //     return
        // }
        // else if ((ec.googlePairingKey || ec.awsAccountId) && !ec.cloudAccountId) {
        //     console.log(ec.connectionServiceId, '======== suspicious =========')
        // }

    })
    console.log(ecs.length, '=============== cleansed data length ==================')
    // console.log(ecs)
    await writeData(ecs)
}

main = async () => {
   await fs.readFile('/Users/AC90909/code/data-migration/fetchAllConnections/getAllConnectionsBackup-prod', 'utf8', async (err, data) => {
        if (err) {
            console.log(err)
        }
       cleanseData(JSON.parse(data))
    })
    // console.log(cle)

}

main()