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
app.use(bodyParser.urlencoded({
    extended: false
}));


///        BLOCK DATA ROUTES

//fetch entire block chain
app.get('/blockchain', function (req, res) {
    //send the whole blockchain
    res.send(bitcoin);
});

//receive a newTransaction on each node from /transaction/broadcast and add it to the node's pending transactions array
app.post("/transaction", function (req, res) {
    const newTransaction = req.body;
    const blockIndex = bitcoin.addTransactionToPendingTransactions(newTransaction)
    res.json({ note: `Transaction will be added in block ${blockIndex}.`})
});

///  every time a new transaction is created, the request needs to be made to  /transaction/broadcast which will ping POST /transaction on every node in the network
// 1- create a new transactions
// 2 - broadcast the transaction to every node
app.post("/transaction/broadcast", function(req, res){
    const newTransaction = bitcoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
    bitcoin.addTransactionToPendingTransactions(newTransaction);
    
    const requestPromises = [];
    bitcoin.networkNodes.forEach( networkNodeUrl =>{
        const requestOptions = {
            uri: networkNodeUrl + "/transaction",
            method: "POST",
            body: newTransaction,
            json: true
        };

        requestPromises.push(rp(requestOptions))
    })

    Promise.all(requestPromises)
    .then(data =>{
        res.json({ note: "Transaction created and broadcast successfully."})
    });
});


// anytime we mine a new block, we need to pick a block to mine it.  this node gets a request to /mine - does the PoW and adds the pengingTransactions, and then broadcasts the new block by hitting every other node via /receive-new-block
//  mine/create a new block - doing a PoW so we can create a new block
app.get("/mine", function (req, res) {
    const lastBlock = bitcoin.getLastBlock();
    const previousBlockHash = lastBlock['hash'];
    const currentBlockData = {
        transactions: bitcoin.pendingTransactions,
        index: lastBlock['index'] + 1
    };

    //need to get the nonce for createNewBlock
    const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);
    const blockHash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce);
    const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash);

    //broadcasting the new block to the network
    const requestPromises = [];
    bitcoin.networkNodes.forEach(networkNodeUrl => {
        const requestOptions = {
            uri: networkNodeUrl + "/receive-new-block",
            method: "POST",
            body: { newBlock: newBlock},
            json: true
        };

        requestPromises.push(rp(requestOptions))
    });

    Promise.all(requestPromises)
    .then(data => {
            //when you mine a new block in the real world, you get some bitcoin, so we have to create a new transaction
            // when the sender address is 00, you know it a tip for mining a new bitcoin
            // the recipient is this node in the blockchain - need to create an address for this node (UUID)
            // we need to broadcast this mining reward transaction to the entire network
        const requestOptions = {
            uri: bitcoin.currentNodeUrl + "/transaction/broadcast",
            method: "POST",
            body: {
                amount: 12.5,
                sender: "00",
                recipient: nodeAddress
            },
            json: true
        };

        return rp(requestOption)
    })
    .then(data =>{
        res.json({
            note: "New block mined and broadcast successfully",
            block: newBlock
        })
    })

})

///     BLOCK REGISTRATION ROUTES

// register a node and broadcast that node to the whole network by making a POST request to /register-node (below)
// 1 - this route is hit by a non-network node that wants to be added with the data of the new URL.  It is registered on the node that received it, and then broadcast to the other network nodes via the /register-node route
app.post("/register-and-broadcast-node", function (req, res) {
    const newNodeUrl = req.body.newNodeUrl;
    // Registering the request URL of the new node into the this node's networkNodes array if it doesn't already exist
    if (bitcoin.networkNodes.indexOf(newNodeUrl) == -1 && bitcoin.currentNodeUrl !== newNodeUrl) bitcoin.networkNodes.push(newNodeUrl)
    
    const regNodesPromises = []
    //broadcasting the new node to the network
    bitcoin.networkNodes.forEach(networkNodeUrl => {
        //setting up the options to make a request to all of the urls in the networkNodes array
        const requestOptions = {
            uri: networkNodeUrl + "/register-node",
            method: "POST",
            body: {
                newNodeUrl: newNodeUrl
            },
            json: true
        };
        // placing the requests `rp()` to register the node in the existing network and putting all of the promises in an array
        regNodesPromises.push(rp(requestOptions))
    });
    
    //  make all of the requests
    Promise.all(regNodesPromises)
        .then(data => {
            // register all of the nodes in the network with the new node
            const bulkRegisterOptions = {
                uri: newNodeUrl + "/register-nodes-bulk",
                method: "POST",
                body: {
                    allNetworkNodes: [...bitcoin.networkNodes, bitcoin.currentNodeUrl]
                },
                json: true
            };
            return rp(bulkRegisterOptions)
        })
        //not doing anything with the data, we want to do the next step in the endpoint - sending a message to the node sending the request
        .then(data => {
            res.json({
                note: "New node registered with network successfully."
            })
        })
        .catch(err => console.log(err))
        
})


//register a node with the network based on the broadcast sent in the above route
// the node that receives the request needs to register the new node
// 2- once all nodes register the new nodes ...
app.post("/register-node", function (req, res) {
    const newNodeUrl = req.body.newNodeUrl;
    // if the node doesn't exist this var will be true
    const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(newNodeUrl) == -1;
    //making sure the node being registered isn't the currentNode
    const notCurrentNode = bitcoin.currentNodeUrl !== newNodeUrl;
    // Registering the newNodeUrl with the node that receives the request if it's not present && not the node being registered
    if (nodeNotAlreadyPresent && notCurrentNode) {
        bitcoin.networkNodes.push(newNodeUrl)
        res.json({
            note: "New node registered successfully."
        })
    } else {
        res.json({
            note: "Node registration unsuccessful."
        })
    }
})

//register multiple nodes at once on the new node being added to the network
//  3- the node that received the original request makes a post request to this route with the original server of the original requester with the URL data of all the other nodes
app.post("/register-nodes-bulk", function (req, res) {
    
    const allNetworkNodes = req.body.allNetworkNodes;
    // iterate over the array of all the network nodes...
   
    allNetworkNodes.forEach(networkNodeUrl => {

        const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(networkNodeUrl) == -1
        const notCurrentNode = bitcoin.currentNodeUrl !== networkNodeUrl;
        // ... and if it's not already in the networkNodes array and not the current node, add it to this nodes networkNodes array 
        if (nodeNotAlreadyPresent && notCurrentNode) bitcoin.networkNodes.push(networkNodeUrl);
    })
    res.json({
        note: "bitcoin.networkNodes for "+ bitcoin.currentNodeUrl +":" +bitcoin.networkNodes
    })
})

////////////////////////////////
app.listen(PORT, function () {
    console.log("Listening on PORT: " + PORT)
})