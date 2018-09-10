$(document).ready(function () {
    // var $characterUsername = $("#character-username");
    // var $characterStock = $("#character-stock");
    var $characterPrice = 1000;
    // $("#character-price");
    // var $opponentUsername = $("#opponent-username");
    // var $opponentStock = $("#opponent-stock");
    var $opponentPrice = 1200;
    // $("#opponent-price");

    function fight() {
        var characterRoll = Math.floor(Math.random() * $characterPrice);
        var opponentRoll = Math.floor(Math.random() * $opponentPrice);

        if (characterRoll > opponentRoll) {
            console.log("You win!");
        } else if (characterRoll < opponentRoll) {
            console.log("You lost");
        } else {
            console.log("Something went wrong, please try again");
        };
    };

    $("#fight").on("click", fight);
});