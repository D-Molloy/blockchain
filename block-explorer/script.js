const makeCollapsible = () => {
    setTimeout(() => {
        $('.collapsible').collapsible();
    }, 200)
}

$(document).ready(function () {
    $('.tabs').tabs();
    $('.parallax').parallax();
    $('select').formSelect();
    $(".tabs>li>a").css("color", '#FFF');
    $(".tabs>.indicator").css("background-color", '#FFF');
    $(".tabs").css("background-color", "#005A96");

    // Connect Tab
    $("#submit_node").click(function () {

        const newNodeData = {
            "newNodeUrl": $("#add_node").val().trim()
        };

        $.post("/register-and-broadcast-node", newNodeData, (data) => {
            console.log("inside post to /reg&Broad", data)
            $("#connect_message").text(data.note).fadeOut(4000)
            $(".curr_node").addClass("curr_node_highlight")
            $(".curr_node").append(`<p class="your_node">Your network address</p>`)
            $(".curr_node").append(data.currNode)
            data.otherNodes.forEach(node => $(".other_nodes").append(`<div class="other_node">${node}</div>`))
        });

        $("#add_node").val("");
    });

////////////////////////////
//////
//////          SHOW COMPLETE TRANSACTION
///  Make sure transaction complete message is showing



    //  Transaction Tab
    $("#submit_trans").click(() => {
        const transData = {
            amount: parseInt($("#create_amount").val().trim()),
            sender: $("#create_sender").val().trim(),
            recipient: $("#create_recip").val().trim()
        };

        $.post("/transaction/broadcast", transData, (data) => {
            console.log("following post /transaction/broadcast", data)
            $("#transaction_message").text(data.note).fadeOut(4000);
        });

        $("#create_amount").val("");
        $("#create_sender").val("");
        $("#create_recip").val("");
    })

    // Mine Tab

    $("#mine_block").click(() => {
        $.get("/mine", data => {
            $("#block_display").empty();
            console.log(data)
            $("#mine_message").text(data.note).fadeOut(4000)
            const block = data.block;
            $("#block_display").append(`<li id="block-${block.index}">
                                        <div class="collapsible-header">
                                            <div class="block_title_div">
                                            <p class="block_title">Block: ${block.index}</p>
                                            </div>
                                        </div>
                                        <div class="collapsible-body">
                                            <div class="block_body">
                                                <p>Block Hash: ${block.hash}</p>
                                                <p>Previous Block Hash: ${block.previousBlockHash}</p>
                                                <p>Nonce: ${block.nonce}</p>
                                                <p>Timestamp: ${block.timestamp}</p>
                                                <p>Transactions in this block:</p>
                                                <div class="transaction_div" id="transactions"></div>
                                            </div>
                                        
                                        </div>
                                    </li>`);

            for (let transaction of block.transactions)
                $(`#transactions`).append(`<div class="trans_block">
                                <p>Amount: <span>${transaction.amount}</span></p>
                                <p>Recipient: <span>${transaction.recipient}</span></p>
                                <p>Sender: <span>${transaction.sender}</span></p>
                                <p>Transaction ID: <span>${transaction.transactionId}</span></p>
                                </div>`)

        })
        makeCollapsible();
        setTimeout(() => {
            $('#block_display').addClass('animated shake');
        }, 3000);
    })


    // View Tab
    $("#view_tab").click(() => {
        $("#view_content").empty()

        $.get("/blockchain", (data) => {
            console.log(data);
            const blockData = data.chain.map(block => {
                return (
                    `<li id="block-${block.index}">
                    <div class="collapsible-header" >
                        <div class="block_title_div">
                        <p class="block_title">Block: ${block.index}</p>
                        </div>
                    </div>
                    <div class="collapsible-body">
                   
                        <div class="block_body">
                            <p>Block Hash: ${block.hash}</p>
                            <p>Previous Block Hash: ${block.previousBlockHash}</p>
                            <p>Nonce: ${block.nonce}</p>
                            <p>Timestamp: ${block.timestamp}</p>
                            <p>Transactions in this block:</p>
                            <div class="transaction_div" id="transactions-${block.index}"></div>
                        </div>
                    
                    </div>
                  </li>`)
            })

            $("#view_content").append(`<div class="col s6">
                <p>Current Node URL:
                    <div id="view_currentNode_title">
                    </div>
                    <p>Other Nodes in the Network:</p>
                    <div id="view_network_nodes"></div>
                </p>
                </div>
                <div class="col s6">
                    <p>Pending Transactions:</p>
                    <div id="pending_trans"></div>
                </div>
                <div class="row">
                    <div class="col s12">
                        <ul class="collapsible expandable" id="block_table">
                        </ul>								
                    </div>
                </div>`);

            $("#view_currentNode_title").text(data.currentNodeUrl);

            //  Add current network nodes
            data.networkNodes.forEach(node => {
                $("#view_network_nodes").append(` [ ${node} ] `);
            });


            //  Add collapsible block elements 
            for (let block of blockData) {
                $("#block_table").append(block);
            }


            //add pending transaction data
            data.pendingTransactions.forEach(trans => {
                $("#pending_trans").append(`<div class="pend_trans_div">
                <p>Amount: <span>${trans.amount}</span></p>
                <p>Sender: <span>${trans.sender}</span></p>
                <p>Recipient: <span>${trans.recipient}</span></p>
                <p>Transaction ID: <span>${trans.transactionId}</span></p>
                </div>`);
            });

            // adding transaction data to each block
            const transArray = [];
            for (let i = 0; i < data.chain.length; i++) {
                transArray.push(data.chain[i].transactions)
            }

            let transData = []
            for (let [i, block] of transArray.entries()) {
                if (block.length !== 0) {
                    // for(let j=0; j< block.length; j++){
                    //     $(`#transactions-${i+1}`).append(block[j].amount)
                    // }
                    for (let transaction of block) {
                        $(`#transactions-${i+1}`).append(`<div class="trans_block">
                                            <p>Amount: <span>${transaction.amount}</span></p>
                                            <p>Recipient: <span>${transaction.recipient}</span></p>
                                            <p>Sender: <span>${transaction.sender}</span></p>
                                            <p>Transaction ID: <span>${transaction.transactionId}</span></p>
                                            </div>`)
                    }

                } else {
                    $(`#transactions-${i+1}`).append("[No Transactions]")
                }
            }
        })
        makeCollapsible();
    })
    // END View Tab

    // /address/:address
        // returns
        // data: {
        //     addressBalance: (int)
        //     addressTransactions: [{amount: (string), sender, recipient, transactionId }]
        // }
    // /transaction/:transactionId
        // data {
        //     block {
        //         hash
        //         indexnonce
        //         previousBlockHash
        //         timestamp
        //         transactions: [ {amount, sender, recipient, transId}]
        //     }
        //     transaction {
        //         amount
        //         recipient
        //         sender
        //         transactionId
        //     }
        // }
    // /block/:blockHash
        //data {
        //     block {
        //         hash
        //         index
        //         nonce
        //         previousBlockHash
        //         timestamp
        //         transactions: [ {amount, sender, recipient, transId}]
        //}

    const displayAddress = (data, node)=> {
        $("#search_results").empty();
        console.log("inside displayAddress", data)
        $("#search_results").append(`<h4>Results:</h4>`)
        $("#search_results").append(`<div class="node_data"><p>Displaying data for node: ${node}</p></div>`)
///////////////
///   FINISH ADDING data 
    }


    // SEARCH TAB
    $(".search_buttons").click(function(event) {
        const type = $(this).data("value");
        const parameter = $(`#${type}`).val()
        // console.log(`/${type}/${parameter}`);

        $.get(`/${type}/${parameter}`)
        .then((data)=> type === "address" ? displayAddress(data, parameter) : type === "transaction" ? console.log("transaction", data) : console.log("block", data))
        .catch(data=> {
            $("#search_results").append(`<h4>Results:</h4>`)
            $("#search_results").append("<p>No information found.  Please check your search parameters.</p>")
        })
    })
});