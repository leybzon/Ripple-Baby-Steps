'use strict';

const RippleAPI = require('ripple-lib').RippleAPI;

//will use testnet at https://developers.ripple.com/xrp-test-net-faucet.html
const addressFrom = 'rJpr9nKV7aikyFdUtPvuumAHYXvNJady1e';
const prodServer = 'wss://s1.ripple.com:443';
const testServer = 'wss://s.altnet.rippletest.net:51233';

const addressTo = 'rDDFfub1aJaqsrztpHcoaJPBYg1eQZxKzs';

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


const address = 'r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59';

api.connect().then(() => {
  console.log('Connected...');
  
//  return api.getTransactions(addressTo).then(transaction => {
//    /* ... */
//  });

api.connect().then(() => {
  api.getBalances(addressFrom).then(balances => {
    console.log(JSON.stringify(balances, null, 2));
    process.exit();
  });
});

}).catch(fail);


