# JavaScript Blockchain
A complete blockchain prototype built in JavaScript.  The blockchain data structure is located in dev/blockchain.js and all API endpoints are in dev/networkNode.js.  Both are thoroughly commented with explanations to how everything works. **Note the block-explorer is still in development and will be overhauled


## Clone the repo and start the network nodes:
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
* the # in node_[#] correlates to the local host # (i.e. node_1 === localhost:3001)
* npm run node_[#] scripts have been setup to start nodes on ports 3001-3005...feel free to add more


## Connecting the network
Make a POST request to `http://localhost:3001/register-and-broadcast-node` with the following data attached to the body using a tool like Postman:
#### Example:
```
{
	"newNodeUrl": "http://localhost:3002"
}
```
* make additional requests with an updated "newNodeUrl" for each node you want to connect to network

## Creating Transactions
Make a POST request to the /register-and-broadcast-node endpoint (e.g. `http://localhost:3001/register-and-broadcast-node`) on any node on the network with the following raw JSON data in the body (be sure you're sending an object with the properties "amount"/number, "sender"/any string of characters, "recipient"/any string of characters)
#### Example:
```
{
	"amount": 100,
	"sender": "sender1",
	"recipient": "recipient1"
}
```
* change the values and make as many transactions you like and make the request to /register-and-broadcast-node from different nodes

## Mining Blocks
To add all of your new transactions to the blockchain, simply hit the /mine endpoint on any network node by typing in the following in your browsers address bar:
#### Example:
```
localhost:3004/mine
```
* You'll see a JSON object that confirms the block was successfully mined


## Viewing the Blockchain
Once you've added some transactions and mined a few blocks, visit the /blockchain endpoint on any network node
#### Example:
```
localhost:3004/blockchain
```
