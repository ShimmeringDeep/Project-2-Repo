var db = require("../models"); //grabs schema and seeds

module.exports = function(app) {

  //pull on event page and user dashboard
  // Get all examples
  app.get("/api/events", function(req, res) {
    //displays all events
    db.event.findAll({}).then(function(Events) {
      res.json(Events); 
    });
  });

  // Create a new example 
  app.post("/api/events/:id", function(req, res) {
    //post a new event
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/events/:id", function(req, res) {
    //delete an event (administrator only ability)
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
