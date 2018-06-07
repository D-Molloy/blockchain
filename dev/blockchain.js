const sha256 = require('sha256');

function Blockchain() {
    //meat of the chain is stored
    // all the block created/mined will be stored here
    this.chain = [];
    //holds all new transactions created before they are put in a block or mine
    // preople will be making a lot of transactions
    //every time a newTransaction is created it will be pushed into this array
    // these transactions are set in stone until a new block is mined (created)
    //newTransactions are just pending transactions that have not been validated yet
    // once validate they are added to the blockchain when a new block is created
    // when createNewTransaction is invoked, the newTransaction is push into the pendingTransactions array
    // then when createNewBlock is invoked, the pendingTransactions are added to the chain permanently
    this.pendingTransactions = []

    // GENESIS BLOCK
    //every chain needs to have a genesis block (the first block)
    // since its the first we don't have any of the needed parameters.  No PoW (so no nonce), no previous block so no previous blockhash or hash
    // fill in default values - can be whatever we want
    // only pass in arbitrary values for the genesis block
    this.createNewBlock(100, '', '')

}

//creates a newBlock, 
Blockchain.prototype.createNewBlock = function (nonce, previousBlockHash, hash) {
    //creat a new block obj -  all of the data we need for a block
    const newBlock = {
        //the block # in the chain
        index: this.chain.length + 1,
        //when the block was created
        timestamp: Date.now(),
        //put all the transactions created in pendingTransactions into this block so that they're inside our blockchain and cant be changed
        transactions: this.pendingTransactions,
        //nonce == proof of work - a number that is a proof that we created this new block in a legit way by using a proof of work method 
        nonce,
        //this hash will be the data from the new block.  pass transactions into a hashing function (compressed into a single string of code)
        hash,
        //similar to hash is the data from the previous block hashed into a string
        previousBlockHash,
    };
    //once we create the new block we want to clear out the existing transactions and start over for the next block
    this.pendingTransactions = [];
    // take the newBlock and adds it to the chain
    this.chain.push(newBlock)

    return newBlock
}

//return the last block in the chain
Blockchain.prototype.getLastBlock = function () {
    return this.chain[this.chain.length - 1];
}

// amount - the amount of the transaction (payload for what is being sent)
// sender - senders address
// recipient - recipients address
Blockchain.prototype.createNewTransaction = function (amount, sender, recipient) {
    const newTransaction = {
        amount,
        sender,
        recipient
    }
    //push the newTransaction into the pendingTransactions array
    this.pendingTransactions.push(newTransaction)

    //want to return what block we will be able to find the new transaction in.  
    //we return the index of the last block in our chain + 1 because that is our new Block index that newTransaction will be in
    return this.getLastBlock()['index']
}

//hashBlock takes in a block from the blockchain and returns a hash of the data
//  all of the parameters come from a single block

Blockchain.prototype.hashBlock = function(previousBlockHash, currentBlockData, nonce){
    //change all the data into a string (including turning the block object into a string)
    const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
    const hash = sha256(dataAsString)

    return hash


}


//one of the main reasons blockchain is so secure is because of the proofOfWork
// this is the most taxing part of the block chain because it needs to be run so many times
//  lots of work to get the right nonce, easy to verify that its correct once we have it
// PoW - every block needs to be added the chain legitimately and it needs to have the correct transactions and data
//  every time we create a new block, we first must make sure its legitimate by mining it through proof PoW
//previousBlockHash that tries to generate a specific hash - in our case it starts with 4 zeroes
// secures the blockchain because in order to generate the correct hash, we need to run hashblock MANY (100s/1000s) times in order to get the create hash, meaning try to re-mine or change a hash is next to impossible.  They also need to go back and remine and recreate every previous chain in the block
Blockchain.prototype.proofOfWork = function(previousBlockHash, currentBlockData){
    //bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce)
        // we get different hash values by changing the nonce (starting at 0), running hashblock again after incrementing nonce, until we get a hash that starts with 4 zeroes
    //repeatedly hash block until it finds correct hash => "0000ADDFOSAJENFADOFDASFM"
    //uses current block data for the hash, but also the previousBlockHash
    //continuously changes nonce value until it fins the correct hash
    // returns to us the nonce value that creates the correct hash

    let nonce = 0;
    //HASHING THE DATA FOR THE FIRST TIME
    let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
    // continue getting new hashes until we meet the PoW criteria
    while (hash.substring(0, 4) !== "0000"){
        nonce++;
        // run this.hashBlock trying to get a hash that starts with 0000
        hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
    }

    // the nonce is essentially the proof
    // WHY IS THE NONCE RETURNED INSTEAD OF THE HASH?
    // the nonce represents the number of time the data has to be hashed to get the 4x0s
    // THIS NUMBER IS THE SAME EVERY TIME YOU RUN THE PROOF OF WORK WITH THE SAME PARAMs
    return nonce;
}


module.exports = Blockchain;