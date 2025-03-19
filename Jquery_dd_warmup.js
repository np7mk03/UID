$(document).ready(function() {  
    $("#draggable").draggable({
        revert: "invalid", // Ensures it reverts if not dropped in a valid target
        start: function(event, ui) {
            $("#droppable").removeClass("ui-state-highlight"); // Reset color when dragging starts
        }
    });

    $("#droppable").droppable({
        accept: "#draggable",
        over: function(event, ui) {
            $(this).addClass("ui-state-highlight"); //Turns green only when hovered
        },
        out: function(event, ui) {
            $(this).removeClass("ui-state-highlight"); //Removes green when dragged away
        },
        drop: function(event, ui) {
            $(this)
                .addClass("ui-state-highlight") // Keeps green if successfully dropped
                .find("p")
                .html("Dropped!");
        }
    });
});


