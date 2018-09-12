const db = require("../models");
// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
  // AUTH ROUTES****************************************************
<<<<<<< HEAD
  app.get("/signup", function(req, res) {
    console.log("req start ***********************", req.user, "req end **********************");
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.render("signup");
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.render("index");
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    res.render("createchar");
  });
=======

  /*
    app.get("/", function(req, res) {
      // If the user already has an account send them to the members page
      if (req.user) {
        res.redirect("/members");
      }
      res.sendFile(path.join(__dirname, "../public/signup.html"));
    });
  
    app.get("/login", function(req, res) {
      // If the user already has an account send them to the members page
      if (req.user) {
        res.redirect("/members");
      }
      res.sendFile(path.join(__dirname, "../public/login.html"));
    });
  
    // Here we've add our isAuthenticated middleware to this route.
    // If a user who is not logged in tries to access this route they will be redirected to the signup page
    app.get("/members", isAuthenticated, function(req, res) {
      res.sendFile(path.join(__dirname, "../public/members.html"));
    });
  */
>>>>>>> master


  // GAME ROUTES*****************************************************
  // Load index page
  app.get("/", function (req, res) {
    db.Character.findAll({}).then(function (dbCharacter) {
      res.render("landing", {
        msg: "Welcome!",
        username: dbCharacter.username,
        stockChoice: dbCharacter.stockChoice,
        stockPrice: dbCharacter.stockPrice
        // examples: dbExamples
      });
    });
  });

  // Load index page
  app.get("/index", function (req, res) {
    db.Character.findAll({}).then(function (dbCharacter) {
      res.render("index", {
        msg: "Welcome!",
        username: dbCharacter.username,
        stockChoice: dbCharacter.stockChoice
        // examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/characters/:id", function (req, res) {
    db.Character.findOne({ where: { id: req.params.id } }).then(function (dbCharacter) {
      res.render("characters", {
        username: dbCharacter.username,
        stockChoice: dbCharacter.stockChoice
      });
    });
  });

  app.get("/characters", function (req, res) {
    db.Character.findAll({}).then(function (dbCharacter) {
      res.render("characters", {
        username: dbCharacter.username
      });
    });
  });

  app.get("/fight", function (req, res) {
    db.Character.findAll({}).then(function (dbCharacter) {
      res.render("fight", {
        username: dbCharacter.username,
        stockChoice: dbCharacter.stockChoice,
        stockPrice: dbCharacter.stockPrice
      });
    });
  });

  //THIS IS THE GET FROM THE DATABASE TO RETRIEVE THE STATS FOR EACH CHARACTER BEFORE THE FIGHT
  app.get("/fight/:id1/:id2", function (req, res) {

    db.Character.findOne({ where: { id: req.params.id1 } }).then(function (dbOpponent) {
      db.Character.findOne({ where: { id: req.params.id2 } }).then(function (dbCharacter) {
        res.render("fight", {
          character: {
            username: dbCharacter.username,
            stockChoice: dbCharacter.stockChoice,
            stockPrice: dbCharacter.stockPrice
          }, opponent: {
            username: dbOpponent.username,
            stockChoice: dbOpponent.stockChoice,
            stockPrice: dbOpponent.stockPrice
          }
        });
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
