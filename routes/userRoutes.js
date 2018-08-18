var db = require("../models");

module.exports = function (app) {
  // Get all examples
  app.get("/:username/:pwd/home", function (req, res) {
    db.User.findAll({
      where: {
        username: req.params.username,
        password: req.params.pwd //md5 hash of pwd
      }
    }).then(function (user) {
      console.log("THIS IS WHAT YOU WANT TO KNOW  " + user)
      res.json(user);
    });
  });

  // Create a new example
  app.post("/api/newuser/", function (req, res) {
    db.User.create(req.body).then(function (newUser) {
      res.json(newUser);
    });
  });

  app.put("/api/user", function (req, res) {
    db.User.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function (user) {
      res.json(user);
    });
  });


};

//get for both pages (EVENT)
//create new user
//put for update