var db = require("../models");

module.exports = function (app) {

  // Required to use depreciate ensureAuthenticated method
  var passport = require("passport");
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

  app.post("/dashboard", function (req, res) {
    // Take the request...
    var user = req.body;

    // Then add the character to the database using sequelize
    db.User.create({
      name: user.name,
      email: user.email,
      password: user.password,
      handle: user.handle,
      address: user.address
    }).then(function (user) {
      var url = {
        url: "/dashboard"
      }
      res.json(url)
    });
  });


  app.post("/api/comment/create", function (req, res) {
    // Take the request...

    console.log(req.body);
    var comment = req.body;

    // Then add the character to the database using sequelize
    db.Comment.create({
      UserId: 1,
      EventId: 1,
      user_comment: comment.comment,
      isGoing: comment.isGoing
    }).then(function (data) {
      var url = {
        url: `/events/1`
      }
      res.json(url)
    });
  });




  // ----------------------------------------------------------------------- Ping
  //app.get("/ping", routes.ping);

  // ----------------------------------------------------------------------- Account
  app.get("/account", ensureAuthenticated, function (req, res) {
    User.findById(req.session.passport.user, function (err, user) {
      if (err) {
        console.log(err);  // handle errors
      } else {
        res.render("account", { user: user });
      }
    });
  });
  
  // ----------------------------------------------------------------------- Account
  app.get("/account", ensureAuthenticated, function (req, res) {
    User.findById(req.session.passport.user, function (err, user) {
      if (err) {
        console.log(err);  // handle errors
      } else {
        res.render("account", { user: user });
      }
    });
  });

  // ----------------------------------------------------------------------- Logout
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // Load single event page and pass in an event by id
  app.get("/events/:id", function (req, res) {
    db.Event.findOne({ where: { id: req.params.id } }).then(function (Event) {
      db.Comment.findAll({
        include: [

          {
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
          url: "/events/:" + results.id
        }
        console.log("url dentro de attending "+attending.url);
        //  res.json(attending);

        res.render("event", {  //again check with Enrique 
          event: Event,
          attending: attending
        });
      });
    });
  });


  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};


      // //llamada al evento segun el id
      // app.get("/events/:id", function(req, res) {
      //   // Take the request...
      //   var id = req.body

      // }).then(function(event){
      //     var url ={
      //       url : `/events/${event.id}`
      //     }
      //     res.json (url)
      //   });

