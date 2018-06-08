// THIS SERVER/API is a node in the blockchain
const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const Blockchain = require("./blockchain");
const bitcoin = new Blockchain();

const PORT = 8080;
//creates a unique random string that we'll use for this nodes address
const uuid = require("uuid/v1");
const nodeAddress = uuid().split("-").join("");



// if a req comes in with json/form data, parse it so we can access it in the routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//fetch entire block chain
app.get('/blockchain', function(req, res){
    //send the whole blockchain
    res.send(bitcoin);
});


//create a new transaction in the chain
app.post("/transaction", function(req, res){
    const blockIndex = bitcoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
    //createNewTransaction returns the block number the transaction will be added to
    res.json({note: `Transaction will be added in block ${blockIndex}.`});
});

//  mine/create a new block - doing a PoW so we can create a new block
app.get("/mine", function(req, res){
    const lastBlock = bitcoin.getLastBlock();
    // console.log("lastBlock:" , lastBlock);
    const previousBlockHash = lastBlock['hash'];
    const currentBlockData = {
        transactions: bitcoin.pendingTransactions,
        index: lastBlock['index'] + 1
    };
    // console.log("currentBlockData", currentBlockData);
    //need to get the nonce for createNewBlock
    const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);
    const blockHash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce);
    //when you mine a new block in the real world, you get some bitcoin, so we have to create a new transaction
    // when the sender address is 00, you know it a tip for mining a new bitcoin
    // the recipient is this node in the blockchain - need to create an address for this node (UUID)
    bitcoin.createNewTransaction(12.5, "00", nodeAddress)
    const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash);
    res.json({
        note: "New block mined successfully",
        block: newBlock
    })

})


app.listen(PORT, function(){
    console.log("Listening on PORT: " + PORT)
})
