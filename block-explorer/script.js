

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
        }
        
        $.post("/register-and-broadcast-node", newNodeData, (data)=> {
            $("#connect_message").text(data.note).fadeOut(4000)
        })
    });

    // View Tab
    $("#view_tab").click(function(){
        $.get("/blockchain", (data)=>{
            console.log(data);
        })
    })
  });