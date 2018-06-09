// THIS SERVER/API is a node in the blockchain
const express = require("express");
const rp = require('request-promise')
const bodyParser = require("body-parser");

const Blockchain = require("./blockchain");
const bitcoin = new Blockchain();

//pulled from the package.json start script
const PORT = process.argv[2];


//creates a unique random string that we'll use for this nodes address
const uuid = require("uuid/v1");
const nodeAddress = uuid().split("-").join("");


const app = express();
// if a req comes in with json/form data, parse it so we can access it in the routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


///        BLOCK DATA ROUTES

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

///     BLOCK REGISTRATION ROUTES

// register a node and broadcast that node to the whole network by making a POST request to /register-node (below)
// 1 - this route is hit by a non-network node that wants to be added with the data of the new URL.  It is registered on the node that received it, and then broadcast to the other network nodes via the /register-node route
app.post("/register-and-broadcast-node", function(req, res){
    const newNodeUrl = req.body.newNodeUrl;
    // Registering the request URL of the new node into the this node's networkNodes array if it doesn't already exist
    if(bitcoin.networkNodes.indexOf(newNodeUrl) === -1){
        bitcoin.networkNodes.push(newNodeUrl)
    }

    const registerNodesPromises = []
    //broadcasting the new node to the network
    bitcoin.networkNodes.forEach(networkNodeUrl => {
        //setting up the options to make a request to all of the urls in the networkNodes array
        const requestOptions = {
            uri: networkNodeUrl + "/register-node",
            method: "POST",
            body: {newNodeUrl:newNodeUrl},
            json:true
        }
        // placing the requests `rp()` to register the node in the existing network and putting all of the promises in an array
       registerNodesPromises.push(rp(requestOptions))
    });

    //  make all of the requests
    Promise.all(registerNodesPromises)
    .then(data => {
        // register all of the nodes in the network with the new node
        const bulkRegisterOptions = {
            uri: newNodeUrl + "/register-nodes-bulk",
            method: "POST",
            body: { allNetworkNodes:[...bitcoin.networkNodes, bitcoin.currentNodeUrl] },
            json: true
        };

        return rp(bulkRegisterOptions)
    })
    //not doing anything with the data, we want to do the next step in the endpoint - sending a message to the node sending the request
    .then(data =>{
        res.json({ note: "New node registered successfully."})
    })
})


//register a node with the network based on the broadcast sent in the above route
// the node that receives the request needs to register the new node
// 2- once all nodes register the new nodes ...
app.post("/register-node", function(req, res){
    const newNodeUrl = req.body.newNodeUrl;
    // if the node doesn't exist this var will be true
    const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(newNodeUrl) === -1;
    //making sure the node being registered isn't the currentNode
    const notCurrentNode = bitcoin.currentNodeUrl !== newNodeUrl;
    // Registering the newNodeUrl with the node that receives the request if it's not present && not the node being registered
    if(nodeNotAlreadyPresent && notCurrentNode) bitcoin.networkNodes.push(newNodeUrl)
    res.json({ note: "New node registered successfully."})

})

//register multiple nodes at once
//  3- the node that received the original request makes a post request to this route with the original server of the original requester with the URL data of all the other nodes
app.post("/register-nodes-bulk", function(req, res){

})

////////////////////////////////
app.listen(PORT, function(){
    console.log("Listening on PORT: " + PORT)
})
