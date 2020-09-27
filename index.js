const { Application, genesisBlockDevnet, configDevnet} = require('lisk-sdk');
const IpfsTransaction = require('./transactions/ipfs_transaction');
const InitTransaction = require('./transactions/init_transaction');

configDevnet.app.label = 'LiskVoice-blockchain-app';
const app = new Application(genesisBlockDevnet, configDevnet);

const { ExtendedHTTPApiModule } = require('@moosty/lisk-extended-api');
app.registerModule(ExtendedHTTPApiModule, {
  port: 2020, // default 2020 
  limit: 100, // default 100
  assets: [ // allowed assets
     'ipfs'
  ],
});

app.registerTransaction(IpfsTransaction);
app.registerTransaction(InitTransaction);

app
	.run()
	.then(() => app.logger.info('App started...'))
	.catch(error => {
		console.error('Faced error in application', error);
		process.exit(1);
	});

