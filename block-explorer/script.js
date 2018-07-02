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
            $("#connect_message").text(data.note).fadeOut(4000)
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

            console.log(transArray)

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
    // /transaction/:transactionId
    // /block/:blockHash

    // SEARCH TAB
    // app.get("/block/:blockHash",

    $(".search_buttons").click(function(event) {
        const type = $(this).data("value");
        const parameter = $(`#${type}`).val()
        console.log(`/${type}/${parameter}`);

        $.get(`/${type}/${parameter}`)
        .then((data)=> type === "address" ? console.log("address" , data) : type === "transaction" ? console.log("transaction", data) : console.log("block", data))
        .catch(data=> {
//////////////
///     Add message to DOM 
            console.log("NOT FOUND!")
        })
    })
});