$(document).ready(function () {

  var yourValue = 1000;
  var theirValue = 1000;
  var youId = localStorage.getItem("youId");
  var opponentId = localStorage.getItem("opponentId");
  var characterChange = parseFloat($("#player").attr("data-price"));
  var opponentChange = parseFloat($("#opponent").attr("data-price"));

  // function getPrices(opponentId, youId) {
  //   $.ajax({
  //     method: "GET",
  //     url: "/fight/" + opponentId + "/" + youId
  //   }).then(function (response) {
  //     opponentChange = response.opponent.stockPrice;
  //     theirValue = response.opponent.totalValue;
  //     characterChange = response.character.stockPrice;
  //     yourValue = response.character.totalValue;
  //     console.log(response);
  //   });
  // }

  // getPrices(opponentId, youId);

  yourValue = yourValue * (1 + characterChange);
  theirValue = theirValue * (1 + opponentChange);

  function fight() {
    var characterRoll = Math.floor(Math.random() * yourValue);
    var opponentRoll = Math.floor(Math.random() * theirValue);

    if (characterRoll > opponentRoll) {
      console.log("You win!");
    } else if (characterRoll < opponentRoll) {
      console.log("You lost");
    } else {
      console.log("Something went wrong, please try again");
    }
  }

  $("#fight").on("click", fight);
});