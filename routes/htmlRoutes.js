var db = require("../models");

module.exports = function (app) {
  // Load when on user dashboard <<plz help>>

  app.get("/", function (req, res) {
    res.render("index");
  })

  app.get("/dashboard", function (req, res) {

    //when on "/" database using the event table will find all events then render on user dashboard
    db.Event.findAll({}).then(function (Events) {
      console.log(Events);
      res.render("dashboard", {  //check with Enrique on the name of handlebars template for dashboard

        events: Events

      });
    });
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
