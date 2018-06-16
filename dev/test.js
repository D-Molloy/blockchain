const Blockchain = require('./blockchain');

const bitcoin = new Blockchain();
// console.log(bitcoin)
// // Blockchain { chain: [], newTransactions: [] }


// bitcoin.createNewBlock(12123, "9a0ds7fasfsdfasdf", 'fdafsf0d0sfasdfsaf')
// bitcoin.createNewBlock(56464, "9asdfafasfasfdsaf", 'fqerqrwrqraf')
// bitcoin.createNewBlock(235123, "4q6rsyahrh", 'ra34gafdbu532')
// bitcoin.createNewBlock(099999, "2154rfaadfa", 'ilikebacon')

// console.log(bitcoin)
// Blockchain {
//     chain:
//      [ { index: 1,
//          timestamp: 1528316189585,
//          transactions: [],
//          nonce: 12123,
//          hash: 'fdafsf0d0sfasdfsaf',
//          previousBlockHash: '9a0ds7fasfsdfasdf' },
//        { index: 2,
//          timestamp: 1528316189585,
//          transactions: [],
//          nonce: 56464,
//          hash: 'fqerqrwrqraf',
//          previousBlockHash: '9asdfafasfasfdsaf' },
//        { index: 3,
//          timestamp: 1528316189585,
//          transactions: [],
//          nonce: 235123,
//          hash: 'ra34gafdbu532',
//          previousBlockHash: '4q6rsyahrh' },
//        { index: 4,
//          timestamp: 1528316189585,
//          transactions: [],
//          nonce: 99999,
//          hash: 'ilikebacon',
//          previousBlockHash: '2154rfaadfa' } ],
//     newTransactions: [] }


///   CREATING THE FIRST BLOCK 

// bitcoin.createNewBlock(23714087, "1212121212", "fdosayoihefaef8wa0");
// bitcoin.createNewTransaction(100, 'DENIS948-9fdufa', 'AMANDAadfdfe142ddasc')
// console.log(bitcoin)

// Blockchain {
//     chain:
//      [ { index: 1,
//          timestamp: 1528318020184,
//          transactions: [],
//          nonce: 23714087,
//          hash: 'fdosayoihefaef8wa0',
//          previousBlockHash: '1212121212' } ],
//     pendingTransactions:
//      [ { amount: 100,
//          sender: 'DENIS948-9fdufa',
//          recipient: 'AMANDAadfdfe142ddasc' } ] }

// ///    ADDING A NEW BLOCK TO THE CHAIN
// bitcoin.createNewBlock(23714087, "1212121212", "fdosayoihefaef8wa0");
// bitcoin.createNewTransaction(100, 'DENIS948-9fdufa', 'AMANDAadfdfe142ddasc')
// bitcoin.createNewBlock(1212121, "521397redr09fa9das", "21078dfaddffaif");




// console.log(bitcoin)
// // Blockchain {
// //     chain:
// //      [ { index: 1,
// //          timestamp: 1528318254508,
// //          transactions: [],
// //          nonce: 23714087,
// //          hash: 'fdosayoihefaef8wa0',
// //          previousBlockHash: '1212121212' },
// //        { index: 2,
// //          timestamp: 1528318254508,
// //          transactions: [Array],
// //          nonce: 1212121,
// //          hash: '21078dfaddffaif',
// //          previousBlockHash: '521397redr09fa9das' } ],
// //     pendingTransactions: [] }

// console.log(bitcoin.chain[1])
// // { index: 2,
// // timestamp: 1528318354488,
// // ** transactions:
// // ** [ { amount: 100,
// // **     sender: 'DENIS948-9fdufa',
// // **     recipient: 'AMANDAadfdfe142ddasc' } ],
// // nonce: 1212121,
// // hash: '21078dfaddffaif',
// // previousBlockHash: '521397redr09fa9das' }


///   ADDING MULTIPLE TRANSACTIONS
// bitcoin.createNewBlock(23714087, "1212121212", "fdosayoihefaef8wa0");
// bitcoin.createNewTransaction(100, 'DENIS948-9fdufa', 'AMANDAadfdfe142ddasc')
// bitcoin.createNewBlock(1212121, "521397redr09fa9das", "21078dfaddffaif");
// ///all of these should show up in the pendingTransactions array
// bitcoin.createNewTransaction(50, 'DENIS948-9fdufa', 'AMANDAadfdfe142ddasc');
// bitcoin.createNewTransaction(300, 'DENIS948-9fdufa', 'AMANDAadfdfe142ddasc');
// bitcoin.createNewTransaction(2000, 'DENIS948-9fdufa', 'AMANDAadfdfe142ddasc');

// console.log(bitcoin)
// // Blockchain {
// //     chain:
// //      [ { index: 1,
// //          timestamp: 1528318670331,
// //          transactions: [],
// //          nonce: 23714087,
// //          hash: 'fdosayoihefaef8wa0',
// //          previousBlockHash: '1212121212' },
// //        { index: 2,
// //          timestamp: 1528318670331,
// //          transactions: [Array],
// //          nonce: 1212121,
// //          hash: '21078dfaddffaif',
// //          previousBlockHash: '521397redr09fa9das' } ],
// //     pendingTransactions:
// //      [ { amount: 50,
// //          sender: 'DENIS948-9fdufa',
// //          recipient: 'AMANDAadfdfe142ddasc' },
// //        { amount: 300,
// //          sender: 'DENIS948-9fdufa',
// //          recipient: 'AMANDAadfdfe142ddasc' },
// //        { amount: 2000,
// //          sender: 'DENIS948-9fdufa',
// //          recipient: 'AMANDAadfdfe142ddasc' } ] }



///   ADDING THE PENDING TRANSACTIONS TO THE CHAIN --- CREATE ANOTHER BLOCK!

// bitcoin.createNewBlock(23714087, "1212121212", "fdosayoihefaef8wa0");
// bitcoin.createNewTransaction(100, 'DENIS948-9fdufa', 'AMANDAadfdfe142ddasc')
// bitcoin.createNewBlock(1212121, "521397redr09fa9das", "21078dfaddffaif");
// ///all of these should show up in the pendingTransactions array
// bitcoin.createNewTransaction(50, 'DENIS948-9fdufa', 'AMANDAadfdfe142ddasc');
// bitcoin.createNewTransaction(300, 'DENIS948-9fdufa', 'AMANDAadfdfe142ddasc');
// bitcoin.createNewTransaction(2000, 'DENIS948-9fdufa', 'AMANDAadfdfe142ddasc');
// ///commit the pending transactions to the blockchain
// bitcoin.createNewBlock(0987665, "DASFDASPDOIFjd", "DADFOS{DFSPDFIASDFDAH");
// console.log(bitcoin)
// // Blockchain {
// //     chain:
// //      [ { index: 1,
// //          timestamp: 1528318850527,
// //          transactions: [],
// //          nonce: 23714087,
// //          hash: 'fdosayoihefaef8wa0',
// //          previousBlockHash: '1212121212' },
// //        { index: 2,
// //          timestamp: 1528318850527,
// //          transactions: [Array],
// //          nonce: 1212121,
// //          hash: '21078dfaddffaif',
// //          previousBlockHash: '521397redr09fa9das' },
// //        { index: 3,
// //          timestamp: 1528318850527,
// //          transactions: [Array],
// //          nonce: 987665,
// //          hash: 'DADFOS{DFSPDFIASDFDAH',
// //          previousBlockHash: 'DASFDASPDOIFjd' } ],
// //     pendingTransactions: [] }

// // the three transactions will now be stored in the last block
// console.log(bitcoin.chain[2])
// // { index: 3,
// //     timestamp: 1528319016040,
// //     transactions:
// //      [ { amount: 50,
// //          sender: 'DENIS948-9fdufa',
// //          recipient: 'AMANDAadfdfe142ddasc' },
// //        { amount: 300,
// //          sender: 'DENIS948-9fdufa',
// //          recipient: 'AMANDAadfdfe142ddasc' },
// //        { amount: 2000,
// //          sender: 'DENIS948-9fdufa',
// //          recipient: 'AMANDAadfdfe142ddasc' } ],
// //     nonce: 987665,
// //     hash: 'DADFOS{DFSPDFIASDFDAH',
// //     previousBlockHash: 'DASFDASPDOIFjd' }



///    testing the hashBlock method
// //note that the hash will be the same every time unless a character is changed, then it will be completely different
// const previousBlockHash = "1121`244151ewdafsf";
// // currentBlockData is all the transactions in the block
// const currentBlockData = [
//     {
//         amount: 10,
//         sender: "214ureufu0asdfd",
//         recipient: "cvjvzijpbixbxzcvbx"
//     },
//     {
//         amount: 30,
//         sender: "asdfafasfa",
//         recipient: "retwqhbrasgdcv"
//     },
//     {
//         amount: 100,
//         sender: "4wqygadfsgvfbxcb",
//         recipient: "ewtywwqaesgfjsfgu"
//     }
// ]

// const nonce = 100
// console.log(bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce));
// //f9ee7c6c1e17e7e9ecad421ec30aa58d00dd216bfb36856bca1c9b5ae503fa79



///       TESTING THE PROOF OF WORK

// const previousBlockHash = "1121`244151ewdafsf";
// const currentBlockData = [
//     {
//         amount: 10,
//         sender: "214ureufu0asdfd",
//         recipient: "cvjvzijpbixbxzcvbx"
//     },
//     {
//         amount: 30,
//         sender: "asdfafasfa",
//         recipient: "retwqhbrasgdcv"
//     },
//     {
//         amount: 100,
//         sender: "4wqygadfsgvfbxcb",
//         recipient: "ewtywwqaesgfjsfgu"
//     }
// ]

// console.log(bitcoin.proofOfWork(previousBlockHash, currentBlockData))
// // 36914 - it took this many iterations to find the hash below
// // THIS NUMBER IS THE SAME EVERYTIME YOU RUN THE PROOF OF WORK WITH THE SAME PARAMs
// // 00004b0a740c2a267969339aa25fe832dd569c7037365b02822a88aaa0368c9

// //pass the nonce from above  into hashBlock
// console.log(bitcoin.hashBlock(previousBlockHash, currentBlockData, 36914));
// // this returns a hash that has four 0s on the first try because we know the nonce (note its the same as the h above)
// // 000004b0a740c2a267969339aa25fe832dd569c7037365b02822a88aaa0368c9



///       TESTING THE GENESIS BLOCK
// console.log(bitcoin)
// this is the genesis block:
//Blockchain {
//     chain:
//     [ { index: 1,
//         timestamp: 1528348295987,
//         transactions: [],
//         nonce: 100,
//         hash: '',
//         previousBlockHash: '' } ],
//    pendingTransactions: [] }


///       TESTING THE chainIsValid method


const bc1 = {
    "chain": [{
            "index": 1,
            "timestamp": 1529116510769,
            "transactions": [],
            "nonce": 100,
            "hash": "0",
            "previousBlockHash": "0"
        },
        {
            "index": 2,
            "timestamp": 1529116617800,
            "transactions": [],
            "nonce": 18140,
            "hash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100",
            "previousBlockHash": "0"
        },
        {
            "index": 3,
            "timestamp": 1529116840631,
            "transactions": [{
                    "amount": 12.5,
                    "sender": "00",
                    "recipient": "e3f38120710d11e892ed3b8ca8325b94",
                    "transactionId": "240135a0710e11e892ed3b8ca8325b94"
                },
                {
                    "amount": 12.5,
                    "sender": "00",
                    "recipient": "e3f38120710d11e892ed3b8ca8325b94",
                    "transactionId": "8d4db100710e11e892ed3b8ca8325b94"
                },
                {
                    "amount": 30,
                    "sender": "0fadfasdsfafdasfadsfasd0",
                    "recipient": "e3f38120710d11e892ed3b8ca8325b94",
                    "transactionId": "99416240710e11e892ed3b8ca8325b94"
                },
                {
                    "amount": 100,
                    "sender": "0fdhbszfnjgdjaegesd0",
                    "recipient": "eqewyeyrfbznvb",
                    "transactionId": "a12caaa0710e11e892ed3b8ca8325b94"
                }
            ],
            "nonce": 20365,
            "hash": "000010b7ebeda4bfe675337294afc3e503de109f8dd4502cc401e60678580a0a",
            "previousBlockHash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100"
        },
        {
            "index": 4,
            "timestamp": 1529116913833,
            "transactions": [{
                    "amount": 12.5,
                    "sender": "00",
                    "recipient": "e3f38120710d11e892ed3b8ca8325b94",
                    "transactionId": "a8909a90710e11e892ed3b8ca8325b94"
                },
                {
                    "amount": 40,
                    "sender": "gdhsdjbcxnbncbcxz0",
                    "recipient": "1234567890",
                    "transactionId": "c9947270710e11e892ed3b8ca8325b94"
                },
                {
                    "amount": 50,
                    "sender": "gdhsdjbcxnbncbcxz0",
                    "recipient": "1234567890",
                    "transactionId": "cbfb3940710e11e892ed3b8ca8325b94"
                },
                {
                    "amount": 60,
                    "sender": "gdhsdjbcxnbncbcxz0",
                    "recipient": "1234567890",
                    "transactionId": "ce546b80710e11e892ed3b8ca8325b94"
                },
                {
                    "amount": 70,
                    "sender": "gdhsdjbcxnbncbcxz0",
                    "recipient": "1234567890",
                    "transactionId": "d0b0f920710e11e892ed3b8ca8325b94"
                }
            ],
            "nonce": 58629,
            "hash": "00002f39429e37141dfbd4fd0a781ec39dfc4371ad98dbabbde44cd98eb0d3a6",
            "previousBlockHash": "000010b7ebeda4bfe675337294afc3e503de109f8dd4502cc401e60678580a0a"
        },
        {
            "index": 5,
            "timestamp": 1529117116959,
            "transactions": [{
                "amount": 12.5,
                "sender": "00",
                "recipient": "e3f38120710d11e892ed3b8ca8325b94",
                "transactionId": "d43257b0710e11e892ed3b8ca8325b94"
            }],
            "nonce": 225816,
            "hash": "000068b005fdc985078bb424fa37a2a95143c84679537e927fba7f0147924f7b",
            "previousBlockHash": "00002f39429e37141dfbd4fd0a781ec39dfc4371ad98dbabbde44cd98eb0d3a6"
        },
        {
            "index": 6,
            "timestamp": 1529117120180,
            "transactions": [{
                "amount": 12.5,
                "sender": "00",
                "recipient": "e3f38120710d11e892ed3b8ca8325b94",
                "transactionId": "4d451020710f11e892ed3b8ca8325b94"
            }],
            "nonce": 36914,
            "hash": "00000473b695b86f1e9c9a7ff2ec8cc6f209bd4c9e7d82729e275e401ec75845",
            "previousBlockHash": "000068b005fdc985078bb424fa37a2a95143c84679537e927fba7f0147924f7b"
        },
        {
            "index": 7,
            "timestamp": 1529117123744,
            "transactions": [{
                "amount": 12.5,
                "sender": "00",
                "recipient": "e3f38120710d11e892ed3b8ca8325b94",
                "transactionId": "4f306560710f11e892ed3b8ca8325b94"
            }],
            "nonce": 31353,
            "hash": "0000fde9cfbd0f79085e46327d2a476ee0a403bdd8e686ad95b31cca1f24f45f",
            "previousBlockHash": "00000473b695b86f1e9c9a7ff2ec8cc6f209bd4c9e7d82729e275e401ec75845"
        }
    ],
    "pendingTransactions": [{
        "amount": 12.5,
        "sender": "00",
        "recipient": "e3f38120710d11e892ed3b8ca8325b94",
        "transactionId": "51501110710f11e892ed3b8ca8325b94"
    }],
    "currentNodeUrl": "http://localhost:3001",
    "networkNodes": []
};

console.log("BlockChain is valid:",bitcoin.chainIsValid(bc1.chain))
// BlockChain is valid: true


//change one hash to see if it unvalidates the block
// BlockChain is valid: false

// can also mess with transaction data - change one character in a transaction and it will return false
// BlockChain is valid: false

//changing the nonce of the Genesis block
// BlockChain is valid: false