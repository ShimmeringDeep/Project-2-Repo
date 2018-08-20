var db = require("../models");

module.exports = function (app) {

  // Required to use depreciate ensureAuthenticated method
  var passport = require("passport");
  var fbAuth = require("../authentication.js");
  var TwitterStrategy = require("passport-twitter").Strategy;
  var GithubStrategy = require("passport-github2").Strategy;
  var GoogleStrategy = require("passport-google-oauth2").Strategy;
  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated())
      return next();
    else
      res.redirect("/login")
  }
  // Load when on user dashboard <<plz help>>

  // ----------------------------------------------------------------------- Home  
  app.get("/", function (req, res) {
    res.render("index");
  })

  // ----------------------------------------------------------------------- Dashboard  
  app.get("/dashboard", function (req, res) {

    //when on "/" database using the event table will find all events then render on user dashboard
    db.Event.findAll({}).then(function (Events) {
      console.log(Events);
      res.render("dashboard", {  //check with Enrique on the name of handlebars template for dashboard

        events: Events

      });
    });
  });


  // ----------------------------------------------------------------------- Ping
  //app.get("/ping", routes.ping);

  // ----------------------------------------------------------------------- Account
  app.get("/account", ensureAuthenticated, function(req, res){
      User.findById(req.session.passport.user, function(err, user) {
        if(err) {
          console.log(err);  // handle errors
        } else {
          res.render("account", { user: user});
        }
      });
  });

  // ----------------------------------------------------------------------- Facebook
  app.get("/auth/facebook",
    passport.authenticate("facebook"),
    function(req, res){});
  app.get("/auth/facebook/callback",
    passport.authenticate("facebook", { failureRedirect: "/" }),
    function(req, res) {
      res.redirect("/account");
  });

  // ----------------------------------------------------------------------- Twitter
  app.get("/auth/twitter",
    passport.authenticate("twitter"),
    function(req, res){});
  app.get("/auth/twitter/callback",
    passport.authenticate("twitter", { failureRedirect: "/" }),
    function(req, res) {
      res.redirect("/account");
  });

  // ----------------------------------------------------------------------- Github
  app.get("/auth/github",
    passport.authenticate("github"),
    function(req, res){});
  app.get("/auth/github/callback",
    passport.authenticate("github", { failureRedirect: "/" }),
    function(req, res) {
      res.redirect("/account");
  });

  // ----------------------------------------------------------------------- Google  
  app.get("/auth/google",
    passport.authenticate("google", { scope: [
      "https://www.googleapis.com/auth/plus.login",
      "https://www.googleapis.com/auth/plus.profile.emails.read"
    ] }
  ));
  app.get("/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    function(req, res) {
      res.redirect("/account");
  });

  // ----------------------------------------------------------------------- Account
  app.get("/account", ensureAuthenticated, function(req, res){
      User.findById(req.session.passport.user, function(err, user) {
          if(err) {
          console.log(err);  // handle errors
          } else {
          res.render("account", { user: user});
          }
      });
  });

  // ----------------------------------------------------------------------- Logout
  app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
  });  

  // Load single event page and pass in an event by id
  app.get("/events/:id", function (req, res) {
  
    db.Event.findOne({ where: { id: req.params.id } }).then(function (Event) {
      res.render("event", {  //again check with Enrique 
        event: Event
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
