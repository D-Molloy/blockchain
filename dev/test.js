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