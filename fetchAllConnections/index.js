const mongoose = require('mongoose');
const promisify = require('util').promisify
const fs = require('fs')
const database_url = 'mongodb://dycon:DyC0nPr0d3t%23erNe7@mongodb01-prod.idc1.level3.com:27017,mongodb02-prod.idc1.level3.com:27017,mongodb03-prod.adc1.level3.com:27017,mongodb04-prod.adc1.level3.com:27017/dynamicConnections_prod?authSource=dynamicConnections_prod&replicaSet=PortalSet'
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
        type: String,
    },
    endDate: {
        required: false,
        type: String,
    },
    submitDate: {
        required: false,
        type: String,
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
}, { collection: 'techpad.connections' });
const main = async () => {
    const connection = await mongoose.connect(database_url);
    const connectionsModel = connection.model('connections', ConnectionsSchema);
    const allConnections= await connectionsModel.find({}).select(['-_id', '-__v']).lean();
    await promisify(fs.writeFile)('./fetchAllConnections/getAllConnectionsBackup-prod', JSON.stringify(allConnections, null, 2));
    await connection.disconnect();
}
main();
