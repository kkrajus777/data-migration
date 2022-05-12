const mongoose = require('mongoose');
const promisify = require('util').promisify
const fs = require('fs')
const testUrl = 'mongodb://dycon:DyC0n3t%23erNe7@mongodb01.test.idc1.level3.com:27017,mongodb02.test.idc1.level3.com:27017,mongodb03.test.adc1.level3.com:27017,mongodb04.test.adc1.level3.com:27017/dynamicConnections_test?authSource=dynamicConnections_test&replicaSet=mongo_test';
const ConnectionsSchema= new mongoose.Schema({
    masterOrderNumber: String,
    serviceId: String,
    quoteUrl: String,
    connectionName: String,
    accountName: String,
    connectionId: String,
    busorg: String,
    customerNumber: String,
    bandwidth: String,
    vrfId: String,
    vrfName: String,
    nniOnramp: String,
    cloudServiceProvider: String,
    piid: String,
    creator: {
        name: String,
        email: String,
    },
    startDate: {
        required: false,
        type: {
            String
        },   index : {
            unique : true,
            dropDups : true
        }
    },
    endDate: {
        required: false,
        type: {
            String
        },    index : {
            unique : true,
            dropDups : true
        }
    },
    submitDate: {
        required: false,
        type: {
            String
        },   index : {
            unique : true,
            dropDups : true
        }
    },
    status: String,
    orderStatus: String,
    serviceOrderAction: String,
    orderNumber: String,
    disconnectOrderNumber: String,
    connectorStatus: String,
    connectionServiceId: String,
    billingType: String,
    billingPrice: String,
    cloudAccountId: String,
    asCloud: String,
    asCtl: String,
    bgpAuthKey: String,
    connectorServiceId: String,
    routingOption: String,
    connectionType: String,
    defaultRoute: String,
    customerSubnet: String,
    cloudSubnet: String,
    cVlan: String,
    definedAggregates: [String],
    region: String,
    natIpBlocks: [String],
}, { collection: 'techpad.connections-test2'});
const main = async () => {
    const connection = await mongoose.connect(testUrl);
    const connectionsModel = connection.model('connections', ConnectionsSchema);
    await fs.readFile('/Users/AC90909/code/data-migration/CleanseData/cleansedData', 'utf8', async (err, data) => {
        if (err) {
            console.log(err)
        }
        connectionsModel.insertMany(JSON.parse(data)).then(()=>{
            console.log('=============== data inserted ==================')
        })
    })
    await connection.disconnect();
}
main();