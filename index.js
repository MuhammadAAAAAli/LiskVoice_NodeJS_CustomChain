const { Application, genesisBlockDevnet, configDevnet} = require('lisk-sdk');
const IpfsTransaction = require('./transactions/ipfs_transaction');
const InitTransaction = require('./transactions/init_transaction');

// MOOSTY Extended API
//import { ExtendedHTTPApiModule } from "@moosty/lisk-extended-api";
//app.registerModule(ExtendedHTTPApiModule, {
//  port: 1234, // default 2020 
//  limit: 1000, // default 100
//  assets: [ // allowed assets
//  ],
//});

configDevnet.app.label = 'LiskVoice-blockchain-app';

const app = new Application(genesisBlockDevnet, configDevnet);

app.registerTransaction(IpfsTransaction);
app.registerTransaction(InitTransaction);

app
	.run()
	.then(() => app.logger.info('App started...'))
	.catch(error => {
		console.error('Faced error in application', error);
		process.exit(1);
	});

