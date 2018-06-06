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

module.exports = Blockchain;