const express = require("express");
const bodyParser = require("body-parser")
const PORT = 8080


const app = express();
// if a req comes in with json/form data, parse it so we can access it in the routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

//fetch entire block chain
app.get('/blockchain', function(req, res){

});


//add a new transaction
app.post("/transaction", function(req, res){
    console.log(req.body)
    res.send(`The amount of the transaction is ${req.body.amount} bitcoins`)
})

//  mine/create a new block
app.get("mine", function(req, res){

})


app.listen(PORT, function(){
    console.log("Listening on PORT: " + PORT)
})
