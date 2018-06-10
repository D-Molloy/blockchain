# blockchain




## Clone the repo:
//git clone [repo]
// cd [repo]
// npm i
//npm run node_1 (up to node_5)
Note: npm run node_[#] scripts have been setup to start nodes on ports 3001-3005...feel free to add more


#Connecting the network
# postman
Make a POST request to http://localhost:3001/register-and-broadcast-node with the following data attached to the body:

{
	""newNodeUrl": "http://localhost:3002"": "http://localhost:[PORT NUMBER TO ADD]"
}