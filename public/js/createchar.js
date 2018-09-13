var $characterStock = $("#character-stock");
var $createBtn = $("#create-submit");
var $characterList = $("#character-list");
var character;
var youId = 0;

$(document).ready(function () {
    var dId;
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/userdata").then(function (data) {
        $(".member-name").text(data.username);
        dId = data.id;
        //console.log("dIdstart**********************", dId, "dIdend*********************");
    }).then(function() {
        API.getAuthorCharacters(dId).then(function(data) {
            //console.log("data**********************", data, "data*********************");
            youId = data[0].id;
            localStorage.setItem("youId", youId);
        });
    });
});

var characterCreator = function (event) {
    event.preventDefault();
    var tickerChar = $characterStock.val().trim();

    $.get("/api/userdata").then(function (data) {
        character = {
            username: data.username,
            stockChoice: tickerChar,
            password: data.password,
            AuthorId: data.id
        };
    });

    getQuote1(tickerChar);

    // if (!(character.stockChoice)) {
    //     alert("You must enter an example text and description!");
    //     return;
    // }

    $characterStock.val("");
};

// copied functions *************************************************************** //

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
    getAuthorCharacters: function (id) {
        return $.ajax({
            url: "api/authors/" + id,
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

// refreshExamples gets new examples from the db and repopulates the list
var refreshCharacters = function () {
    API.getCharacters().then(function (data) {
        // console.log(data);

        var $character = data.map(function (character) {

            var $a = $("<a>")
                .text(character.username + " " + character.stockChoice + " $" + (character.totalValue * (1 + parseFloat(character.stockPrice))).toFixed(2))
                .attr({
                    href: "#collapseExample" + character.id,
                    "data-target": "#collapse" + character.id,
                    class: "fight btn btn-link collapsed",
                    type: "button",
                    "data-id": character.id,
                    "data-toggle": "collapse"
                });

            var $li = $("<li>")
                .attr({
                    class: "list-group-item",
                    "data-id": character.id
                })
                .append($a);


            var $button = $("<button>")
                .addClass("btn btn-danger float-right delete")
                .text("ｘ");

            $li.append($button);

            var $fight = $("<br><a>")
                .text("Fight this guy")
                .attr({
                    href: "/fight/" + character.id + "/" + youId,
                    id: "collapse" + character.id,
                    class: "collapse btn btn-primary float-right",
                    "data-parent": "#accordionExample"
                });

            $li.append($fight);

            return $li;

        });

        $characterList.empty();
        $characterList.append($character);
    });
}

//does something?
refreshCharacters();

function getQuote1(ticker) {
    console.log("get quote 1 is working");
    console.log(ticker);
    var queryURL = "https://api.iextrading.com/1.0/stock/" + ticker + "/quote";
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        console.log(ticker + " price is: " + response);
        console.log("character is line below");
        console.log(character);
        console.log("character is line above");
        character.stockPrice = response.changePercent;
        console.log(character);
        console.log(response);
        API.saveCharacter(character).then(function () {
            refreshCharacters();
        });
    });
}

// HANDLERS ***********************************************************

$createBtn.on("click", characterCreator);

$(document).ready(function () {
    var opponentId;
  
    $(this).on("click", ".fight", function () {
      opponentId = $(this).attr("data-id");
      window.localStorage.setItem("opponentId", opponentId);
      window.localStorage.setItem("youId", "1");
      console.log(opponentId);
    });
  });