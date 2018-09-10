// Get references to page elements
var $characterUsername = $("#character-username");
var $characterStock = $("#character-stock");
var $characterPassword = $("#character-password");
var $submitBtn = $("#submit");
var $refreshBtn = $("refresh");
var $characterList = $("#character-list");
var quote;

// The API object contains methods for each kind of request we'll make
var API = {
  saveCharacter: function (character) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/characters",
      data: JSON.stringify(character)
    });
  },
  getCharacters: function () {
    return $.ajax({
      url: "api/characters",
      type: "GET"
    });
  },
  deleteCharacter: function (id) {
    return $.ajax({
      url: "api/characters/" + id,
      type: "DELETE"
    });
  }
};

// function that gets the real time stock price. cant get it to render to the page because of asynchronous stuff
function getQuote(ticker) {

  var queryURL = "https://api.iextrading.com/1.0/stock/" + ticker + "/price";
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(ticker + " price is: " + response);
    return response;
  });
}
// refreshExamples gets new examples from the db and repopulates the list
var refreshCharacters = function () {
  API.getCharacters().then(function (data) {
    // console.log(data);

    var $character = data.map(function (character) {
      getQuote(character.stockChoice);
      var $a = $("<a>")
        .text(character.username + " " + character.stockChoice)
        .attr("href", "/characters/" + character.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": character.id
        })
        .append($a)


      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;

      // })

    });

    $characterList.empty();
    $characterList.append($character);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function (event) {
  event.preventDefault();

  var character = {
    username: $characterUsername.val().trim(),
    stockChoice: $characterStock.val().trim(),
    password: $characterPassword.val().trim(),
    stockPrice: getQuote($characterStock.val().trim())

  };

  if (!(character.username && character.stockChoice)) {
    alert("You must enter an example text and description!");
    return;
  }
  setTimeout(function () {

    console.log(character);
    API.saveCharacter(character).then(function () {
      refreshCharacters();
    });


  }, 2000);


  $characterUsername.val("");
  $characterStock.val("");
  $characterPassword.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function () {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");


  API.deleteCharacter(idToDelete).then(function () {
    refreshCharacters();
  });



};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$characterList.on("click", ".delete", handleDeleteBtnClick);
// $refreshBtn.on("click",);
refreshCharacters();
