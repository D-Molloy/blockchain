# Blockchain-Explorer
Blockchain Explorer is a complete blockchain prototype built in JavaScript made with the express purpose of providing a better understanding of how blockchain technology works.  User's can create network nodes, make transactions, mine new blocks (complete with a Proof of Work), view the chain, check the validity fo the chain via the Consensus Algorithm, as well as search for a specific node, transaction or block.

The frontend BlockChain Explorer is built to allow users to build and interact with the blockchain, as well as explaining what is happening in each tab.

The blockchain data structure is located in blockchain.js and all API endpoints are in networkNode.js.  Both are thoroughly commented with explanations to how everything works. 


## 1. Clone the repo and start the network nodes:
```
 git clone https://github.com/D-Molloy/blockchain.git
 cd blockchain
 npm i
 npm run node_1
 (new terminal) npm run node_2
 (new terminal) npm run node_3
 (new terminal) npm run node_4
 (new terminal) npm run node_5 
```
Notes:
* start at least two nodes 
* the # in node_[#] correlates to the localhost # (i.e. node_1 === localhost:3001)
* npm `run node_[#]` scripts have been setup to start nodes on ports 3001-3005...feel free to add more by duplicating additional `node_[#]` scripts in the package.json
* note that you can use this over a network by replacing `localhost` in the package.json scripts property with your network IP address:

Change the script from localhost:
```
"node_1": "nodemon --watch dev -e js networkNode.js 3001 http://localhost:3001",
```
To your network IP address:
```
"node_1": "nodemon --watch dev -e js networkNode.js 3001 http://000.000.000.000:3001",
```

## 2. Open a browser tab and visit the localhost that correlates with the node (e.g. localhost:3001)

## 3. Follow the directions in the tabs of Blockchain-Explorer

