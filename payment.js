'use strict';

const RippleAPI = require('ripple-lib').RippleAPI;

//will use testnet at https://developers.ripple.com/xrp-test-net-faucet.html
const addressFrom = 'rJpr9nKV7aikyFdUtPvuumAHYXvNJady1e';
const secret = '<shh...>';
const prodServer = 'wss://s1.ripple.com:443';
const testServer = 'wss://s.altnet.rippletest.net:51233';

const addressTo = 'rDDFfub1aJaqsrztpHcoaJPBYg1eQZxKzs';//(secret: shaQdo3WKSobVbqCCWwEagViALWXz)

const api = new RippleAPI({server: testServer});
const instructions = {maxLedgerVersionOffset: 5};

const payment = {
  source: {
    address: addressFrom,
    maxAmount: {
      value: '0.01',
      currency: 'XRP'
    }
  },
  destination:{ 
    address: addressTo,
    amount: {
      value: '0.01',
      currency: 'XRP'
    }
  }
};

function quit(message) {
  console.log(message);
  process.exit(0);
}

function fail(message) {
  console.error(message);
  process.exit(1);
}

api.connect().then(() => {
  console.log('Connected...');
  return api.preparePayment(addressFrom, payment, instructions).then(prepared => {
    console.log('Payment transaction prepared...');
    const {signedTransaction} = api.sign(prepared.txJSON, secret);
    console.log('Payment transaction signed...');
    api.submit(signedTransaction).then(quit, fail);
  });
}).catch(fail);

//check result at http://ripplerm.github.io/ripple-wallet/
