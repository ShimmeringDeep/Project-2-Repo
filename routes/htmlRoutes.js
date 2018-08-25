var db = require("../models");
var application = require("./application");
var passport = require("passport");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var db = require("../models");
var bcrypt = require("bcrypt-nodejs")




//for Authentication purposes
passport.use("local", new LocalStrategy({
    usernameField: 'email',
  },
  function (username, password, done) {
    db.User.findOne({
      username: username
    }).then((user) => {
      if (!user) {
        console.log('wrong user');
        return done(null, false, {
          message: 'Incorrect User'
        });
      }
      console.log(password)
      console.log(user.password)
      if (password){
        return done(null, user.get());
      } else {
        console.log('wrong pw')
        return done(null, false, {
          message: 'Invalid password'
        });
      }
    })
  }));

module.exports = function (app) {

  // ----------------------------------------------------------------------- Home  
  app.get("/", function (req, res) {
    res.render("index");
  })

  app.post("/sign-up", function (req, res) {
    // Take the request...
    var user = req.body;
    db.User.findOne({
      where: {
        email: user.email
      }
    }).then(function (user1) {
      if (!user1) {
        db.User.create({
          email: user.email,
          password: user.password,
          handle: user.handle,
        }).then(function (user) {
          var url = {
            url: "/"
          }
          res.json(url)
        });
      } else {
        res.redirect('/404')
      };
    });
  });

  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect('/');
  });

  app.post("/login",
    passport.authenticate("local", {
      successRedirect: "/dashboard",
      failureRedirect: "/failed",
    }));

  // ----------------------------------------------------------------------- Dashboard  
  app.get("/dashboard", application.isAuthenticated, function (req, res) {
    //when on "/" database using the event table will find all events then render on user dashboard
    db.Event.findAll({}).then(function (Events) {
      console.log(Events);
      res.render("dashboard", { //check with Enrique on the name of handlebars template for dashboard
        events: Events
      });
    });
  });

  app.post("/api/comment/create", function (req, res) {
    // Take the request...

    console.log(req.body);
    var comment = req.body;

    // Then add the character to the database using sequelize
    db.Comment.create({
      UserId: 1,
      EventId: comment.EventId,
      user_comment: comment.user_comment,
      isGoing: comment.isGoing
    }).then(function (data) {
      var url = {
        url: `/events/1`
      }
      res.json(url)
    });
  });

  // Load single event page and pass in an event by id
  app.get("/events/:id", function (req, res) {
    db.Event.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (Event) {
      db.Comment.findAll({
        include: [{
            model: db.User,
          },
          {
            model: db.Event,
            where: {
              id: req.params.id
            }
          }
        ]
      }).then(function (results) {

        var attending = {
          number: results.length,
          comments: results,
          url: "/events/" + req.params.id,
          eventId: req.params.id
        }
        console.log("url dentro de attending "+attending.url);
        //  res.json(attending);

        res.render("event", {  //again check with Enrique 
          event: Event,
          attending: attending
        });
        // res.json(attending);
      });
    });
  });
  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
