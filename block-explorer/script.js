const makeCollapsible = () => {
    setTimeout(()=>{
        $('.collapsible').collapsible();
    }, 200)
}

$(document).ready(function(){
    $('.tabs').tabs();
    $('.parallax').parallax();
 
    $(".tabs>li>a").css("color", '#FFF');
    $(".tabs>.indicator").css("background-color", '#FFF');
    $(".tabs" ).css("background-color",  "#005A96" );

    // Connect Tab
    $("#submit_node").click(function(){

        const newNodeData = {
            "newNodeUrl": $("#add_node").val().trim()
        };
        
        $.post("/register-and-broadcast-node", newNodeData, (data)=> {
            $("#connect_message").text(data.note).fadeOut(4000)
        });

        $("#add_node").val("");
    });

    //  Transaction Tab
    $("#submit_trans").click(()=>{
        const transData = {
            amount: parseInt($("#create_amount").val().trim()),
            sender: $("#create_sender").val().trim(),
            recipient: $("#create_recip").val().trim()
        };

        $.post("/transaction/broadcast", transData, (data)=> {
            $("#transaction_message").text(data.note).fadeOut(4000);
        });
        
        $("#create_amount").val("");
        $("#create_sender").val("");
        $("#create_recip").val("");
    })


    // Mine Tab
    $("#mine_block").click(() =>{
        $.get("/mine", data => {
            console.log(data)
            $("#mine_message").text(data.note).fadeOut(4000)
        })
          
    })


    // View Tab
    $("#view_tab").click(function(){
        $("#view_content").empty()

        $.get("/blockchain", (data)=>{
            console.log(data);
            const blockData = data.chain.map(block => {
                return (
                `<li id="block-${block.index}">
                    <div class="collapsible-header">
                        
                        <p>Block: ${block.index}</p>
                        <p>Block Hash: ${block.hash}</p>
                   
                    </div>
                    <div class="collapsible-body">
                    <p>Previous Block Hash: ${block.previousBlockHash}</p>
                        <p>Nonce: ${block.nonce}</p>
                        <p>Timestamp: ${block.timestamp}</p>
                        <p>Pending Transactions:</p>
                        <div id="pending_trans"></div>
                        <div class="transaction_div" id="transactions-${block.index}">
                        </div>
                    </div>
                  </li>`)
            })

            //  NEED TO REARRANGE THIS
            //  move pending transactions to the top by current node (remove from blockData)
            //  Add a transaction div to each collapsible


            $("#view_content").append(`<div class="col s6">
                <p>Current Node URL:
                    <div id="view_currentNode_title">
                    </div>
                </p>
                </div>
                <div class="col s6">
                    <p>Current Network Nodes:</p>
                    <div id="view_network_nodes"></div>
                </div>

                <div class="row">
                    <div class="col s12">
                        <ul class="collapsible popout" id="block_table">
                        </ul>								
                    </div>
                </div>`);

            $("#view_currentNode_title").text(data.currentNodeUrl);

            data.networkNodes.forEach(node => {
                $("#view_network_nodes").append(` [ ${node} ] `);
            });


            //  Add collapsible block elements 
            for (let block of blockData){
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


        })
        makeCollapsible();
    })
    // END View Tab
    
  });