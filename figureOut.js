const fs = require('fs')

main = async () => {
    await fs.readFile('/Users/AC90909/code/data-migration/CleanseData/cleansedData', 'utf8', async (err, data) => {
        if (err) {
            console.log(err)
        }
        data = JSON.parse(data)
        data.forEach((item) =>{
            if(!item.cloudAccountId){
                console.log(item, '<------- hmmm')
            }
        })
        // cleanseData(JSON.parse(data))
    })
    // console.log(cle)

}

main()