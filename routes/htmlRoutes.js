var db = require("../models");

module.exports = function(app) {
  // Load when on user dashboard <<plz help>>
  app.get("/", function(req, res) {

    //when on "/" database using the event table will find all events then render on user dashboard
    db.event.findAll({}).then(function(Events) {
      res.render("dashboard", {  //check with Enrique on the name of handlebars template for dashboard
        
        events: Events

      });
    });
  });

  // Load single event page and pass in an event by id
  app.get("/events/:id", function(req, res) {
    db.event.findOne({ where: { id: req.params.id } }).then(function(event) {
      res.render("event", {  //again check with Enrique 
        event: event
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
