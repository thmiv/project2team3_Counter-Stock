$(document).ready(function () {

  var yourValue = 1000;
  var theirValue = 1000;
  var youId = localStorage.getItem("youId");
  var opponentId = localStorage.getItem("opponentId");
  var characterValue = parseFloat($("#player").attr("data-price"));
  var opponentValue = parseFloat($("#opponent").attr("data-price"));

  var API = {
    updateCharacter: function (id, value) {
        return $.ajax({

            method: "PUT",
            url: "/api/characters/" + id,
            data: value
        });
      }
    }

  function fight() {
    var characterRoll = Math.floor(Math.random() * characterValue);
    var opponentRoll = Math.floor(Math.random() * opponentValue);

    if (characterRoll > opponentRoll) {
      characterValue += 100;
      opponentValue -= 25;
      API.updateCharacter(opponentId, {totalValue: opponentValue} );
      API.updateCharacter(youId, {totalValue: characterValue} );
      $(".modal-title").text("You win!");
      $(".modal-body").text("Your Total value went up by $100");
      $("#myModal").toggle("show");
      $("#characterValue").html(characterValue);
      $("#opponentValue").html(opponentValue);
      $("#player").attr("data-price", characterValue);
      $("#opponent").attr("data-price", opponentValue);
    } else if (characterRoll < opponentRoll) {
      characterValue -= 50;
      opponentValue += 25;
      API.updateCharacter(opponentId, {totalValue: opponentValue} );
      API.updateCharacter(youId, {totalValue: characterValue} );
      $(".modal-title").text("You lost");
      $(".modal-body").text("Your Total value went down by $50");
      $("#myModal").toggle("show");
      $("#characterValue").html(characterValue);
      $("#opponentValue").html(opponentValue);
      $("#player").attr("data-price", characterValue);
      $("#opponent").attr("data-price", opponentValue);
    } else {
      console.log("Something went wrong, please try again");
    }
  }

  $("#fight").on("click", fight);
  $(".close").on("click", function () {
    $("#myModal").toggle("hide");
  });
});