$(document).ready(function () {
    if (typeof window.clients === "undefined" || typeof window.sales === "undefined") {
        console.error("clients.js or sales.js not loaded.");
        return;
    }

    let clients = [...window.clients]; // Load clients from clients.js
    let sales = [...window.sales].reverse(); // Load sales from sales.js

    const SALESPERSON = "Nicole Peng";

    // Apply jQuery UI Autocomplete
    $("#client").autocomplete({
        source: clients
    });

    // Function to update sales list
    function updateView() {
        $("#sales-list").empty();
        sales.forEach((sale, index) => {
            const row = $(`
                <div class="row sale-record" data-index="${index}">
                    <div class="col-3 text-end">${sale.salesperson}</div>
                    <div class="col-3">${sale.client}</div>
                    <div class="col-2">${sale.reams}</div>
                    <div class="col-2 d-flex justify-content-end">
                        <button class="delete-btn">X</button>
                    </div>
                </div>
            `);
            row.draggable({ revert: "invalid" });
            $("#sales-list").append(row);
        });
    }

    // Add Sale
    function addSale(clientVal, reamsVal) {
        sales.unshift({ client: clientVal, reams: parseInt(reamsVal, 10), salesperson: SALESPERSON });

        // Add new client to autocomplete
        if (!clients.includes(clientVal)) {
            clients.push(clientVal);
            $("#client").autocomplete("option", "source", clients);
        }

        updateView();
    }

    // Delete Sale
    function deleteSale(index) {
        sales.splice(index, 1);
        updateView();
    }

    // Handle Form Submission
    function handleSubmit() {
        $("#error-message").empty();
        let clientVal = $("#client").val().trim();
        let reamsVal = $("#reams").val().trim();

        if (!clientVal) {
            $("#error-message").append("<div>Please enter a client name.</div>");
            $("#client").focus();
            return;
        }
        if (!reamsVal || isNaN(reamsVal)) {
            $("#error-message").append("<div># reams must be a number.</div>");
            $("#reams").focus();
            return;
        }

        addSale(clientVal, reamsVal);
        $("#client").val("").focus();
        $("#reams").val("");
    }

    $("#submitSale").click(handleSubmit);
    $("#reams").keypress(function (e) {
        if (e.key === "Enter") handleSubmit();
    });

    $("#sales-list").on("click", ".delete-btn", function () {
        const index = $(this).closest(".sale-record").data("index");
        deleteSale(index);
    });

    $("#trash").droppable({
        accept: ".sale-record",
        over: function () { $(this).css("background-color", "yellow"); },
        out: function () { $(this).css("background-color", "#ccc"); },
        drop: function (event, ui) {
            deleteSale(ui.draggable.data("index"));
            $(this).css("background-color", "#ccc");
        }
    });

    updateView();
});



