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
        $("#connect_message").empty().show()
        if (!$("#add_node").val().trim().includes("http://localhost:300")) {
            $("#connect_message").append(`<p>Please enter an active node address.</p>`).css("color", "red").fadeOut(4000);

        } else {

            $(".network_nodes, .connect_title").empty()
            $("#connect_message").empty().show()
            $("#connect_node_area").addClass("blue_border")
            const newNodeData = {
                "newNodeUrl": $("#add_node").val().trim()
            };

            $.post("/register-and-broadcast-node", newNodeData, (data) => {
                $("#connect_message").text(data.note).css("color", "black").fadeOut(4000)
                $(".connect_title").append(`<p>Current Network Nodes:</p>`)
                $(".network_nodes").append(`<div class="your_node"><p class="your_node_address">${data.currNode}</p><p class="your_node_title">(You)</p></div>`)
                data.otherNodes.forEach(node => $(".network_nodes").append(`<div class="other_node">${node}</div>`))
            });

            $("#add_node").val("");
        }
    });



    //  Transaction Tab
    $("#submit_trans").click(() => {
        $("#transaction_message").empty().show()
        const transAmount = $("#create_amount").val().trim()
        const isNum = /^\d+$/.test(transAmount)
        const transData = {
            amount: null,
            recipient: null,
            sender: null
        };


        if (isNum) {
            transData.amount = parseInt($("#create_amount").val().trim())
        } else {
            $("#transaction_message").append("<div>Please enter a valid number (e.g. 50).</div>").css({
                "color": "red"
            });
        }

        if ($("#create_sender").val().trim()) {
            transData.sender = $("#create_sender").val().trim()
        } else {
            $("#transaction_message").append("<div>Please enter a valid sender name (e.g. Bob).</div>").css({
                "color": "red"
            });
        }

        if ($("#create_recip").val().trim()) {
            transData.recipient = $("#create_recip").val().trim()
        } else {
            $("#transaction_message").append("<div>Please enter a valid recipient name (e.g. Betty).</div>").css({
                "color": "red"
            });
        }


        let transComplete = true;
        for (let i in transData) {
            if (transData[i] === null) {
                transComplete = false
                return;
            }
        }

        if (transComplete) {
            $.post("/transaction/broadcast", transData, (data) => {
                console.log("following post /transaction/broadcast", data)
                $("#transaction_message").text(data.note).fadeOut(4000);
                $("#create_amount").val("");
                $("#create_sender").val("");
                $("#create_recip").val("");
            });
        }
    })

    // Mine Tab

    $("#mine_block").click(() => {
        $('#block_display').empty();
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

            for (let transaction of block.transactions){
                $(`#transactions`).append(`<div class="trans_block">
                                <p>Amount: <span>${transaction.amount}</span></p>
                                <p>Recipient: <span>${transaction.recipient}</span></p>
                                <p>Sender: <span>${transaction.sender}</span></p>
                                <p>Transaction ID: <span>${transaction.transactionId}</span></p>
                                </div>`)
            }

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
            if (data.networkNodes.length !== 0) {
                data.networkNodes.forEach(node => {
                    $("#view_network_nodes").append(` [ ${node} ] `);
                });
            } else {
                $("#view_network_nodes").append(`None.  Add more nodes by starting a new server in your terminal and then connect the new node to the network on the "1 - Connect" tab.`);
            }



            //  Add collapsible block elements 
            for (let block of blockData) {
                $("#block_table").append(block);
            }


            //add pending transaction data
            if (data.pendingTransactions.length !== 0) {
                data.pendingTransactions.forEach(trans => {
                    $("#pending_trans").append(`<div class="pend_trans_div">
                    <p>Amount: <span>${trans.amount}</span></p>
                    <p>Sender: <span>${trans.sender}</span></p>
                    <p>Recipient: <span>${trans.recipient}</span></p>
                    <p>Transaction ID: <span>${trans.transactionId}</span></p>
                    </div>`);
                })
            } else {
                $("#pending_trans").append('<p id="no_pend"><em>No Pending Transactions</em></p>')
            };

            // adding transaction data to each block
            const transArray = [];
            for (let i = 0; i < data.chain.length; i++) {
                transArray.push(data.chain[i].transactions)
            }

            let transData = []
            for (let [i, block] of transArray.entries()) {
                if (block.length !== 0) {
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


    // CONSENSUS TAB
    $('#consensus_tab').click(() => $('#consensus_message').empty())
    $('#consensus_button').click(() => {
        $.get('/consensus', (data) => {
            console.log(data)
            $('#consensus_message').text(data.note)
        })
    })



    // SEARCH TAB
    $('#search_tab').click(function(){
        $('#address, #transaction, #block').val('');
        $("#search_results").empty();
    })
    const displayAddress = (data, node) => {
        $("#search_results").empty();
        console.log("inside displayAddress", data)
        $("#search_results").append(`<h4>Results:</h4>`)
        $("#search_results").append(`<div><p>Displaying data for node: ${node}</p><p>Node Balance: ${data.addressData.addressBalance}</p><div class="node_data"></div></div>`)
        data.addressData.addressTransactions.forEach(transaction => {
            $('.node_data').append(`<div id="trans_div"><p>Amount:  ${transaction.amount}</p> <p>Sender:  ${transaction.sender}</p><p>Recipient:  ${transaction.recipient}</p><p>Transaction ID:  ${transaction.transactionId}</p></div>`)
        });
    }

    const transIdSearch = (data, parameter) => {
        $("#search_results").empty();
        $("#search_results").append(`<h4>Results:</h4>`)
        $("#search_results").append(`<p>Displaying transaction: ${parameter}</p>`)
        $("#search_results").append(`<div id="trans_div"><p>Transaction located in block: ${data.block.index}</p><p>Amount:  ${data.transaction.amount}</p> <p>Sender:  ${data.transaction.sender}</p><p>Recipient:  ${data.transaction.recipient}</p><p>Transaction ID:  ${data.transaction.transactionId}</p></div>`)
    }

    const hashSearch = (data, parameter) => {
        let block = data.block
        $("#search_results").empty();
        $("#search_results").append(`<h4>Results:</h4>`)
        $("#search_results").append(`<p>Displaying block for hash: ${parameter}</p>`)
        $("#search_results").append(`<div id="trans_div"><p>Block Hash: ${block.hash}</p><p>Previous Block Hash: ${block.previousBlockHash}</p><p>Nonce: ${block.nonce}</p><p>Timestamp: ${block.timestamp}</p><p>Transactions in this block:</p><div class="transaction_div" id="transactions"></div>`)

        for (let transaction of block.transactions){
            $(`#transactions`).append(`<div class="trans_block">
                            <p>Amount: <span>${transaction.amount}</span></p>
                            <p>Recipient: <span>${transaction.recipient}</span></p>
                            <p>Sender: <span>${transaction.sender}</span></p>
                            <p>Transaction ID: <span>${transaction.transactionId}</span></p>
                            </div>`)
        }

    }

    $(".search_buttons").click(function() {
        $("#search_results").empty();
        const type = $(this).data("value");
        const parameter = $(`#${type}`).val()

        $('#address, #transaction, #block').empty();
        $.get(`/${type}/${parameter}`)
            .then((data) => type === "address" ? displayAddress(data, parameter) : type === "transaction" ? transIdSearch(data, parameter) : hashSearch(data, parameter))
            .catch(data => {
                $("#search_results").append("<p>No information found.  Please check your search parameters.</p>")
            })
    })
});