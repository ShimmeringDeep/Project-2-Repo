// ------------------------------------------------------------------------------------- <dependencies>
require("dotenv").config();
var fs = require("fs");
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
// var routes = require("./routes");
var config = require("./oauth.js");
var passport = require("passport");
var fbAuth = require("./authentication.js");
var TwitterStrategy = require("passport-twitter").Strategy;
var GithubStrategy = require("passport-github2").Strategy;
var GoogleStrategy = require("passport-google-oauth2").Strategy;
var exphbs = require("express-handlebars");
var helpers = require("handlebars-helper-css"); 
var logger = require("express-logger");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var multer = require("multer");
var session = require("express-session");
var methodOverride = require("method-override");

var db = require("./models");
// ------------------------------------------------------------------------------------- </dependencies>

// ------------------------------------------------------------------------------------- <config>
var app = express();
var PORT = process.env.PORT || 3000;

//Authentication
//app.use(logger());
app.use(cookieParser());
app.use(methodOverride());
app.use(session({ secret: "my_precious" }));
app.use(passport.initialize());
app.use(passport.session());
//app.use(app.router);

    // Middleware
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());
app.use(express.static("public"));

// Handlebars
app.engine(
    "handlebars",
    exphbs({
        defaultLayout: "main"
    })
);
app.set("view engine", "handlebars");

// ------------------------------------------------------------------------------------- </config>

// ------------------------------------------------------------------------------------- <serialize and deserialize>
passport.serializeUser(function(user, done) {
    console.log("serializeUser: " + user._id);
    done(null, user._id);
});
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user){
      console.log(user);
        if(!err) done(null, user);
        else done(err, null);
      });
});
// ------------------------------------------------------------------------------------- </serialize and deserialize>

// ------------------------------------------------------------------------------------- <routes>
// app.get("/api/comments", function(req, res) {

        
//   var eventID = req.body.eventfulID;
//   var userId = req.body.userId;

//   db.Comment.findAll({
//       where: {
//          isGoing: true
//       },
//       include: [
//           {
//               model: db.User,
//             //   where: {
//             //       id: 1
//             //   }
//           },
//           {
//               model: db.Event,
//             //   where: {
//             //       id: 1
//             //   }
//           }
//       ]
//   }).then(function(results) {
//       console.log(results, res)
//       res.json(results);
//   });
// });

// ----------------------------------------------------------------------- User

// ----------------------------------------------------------------------- Admin
require("./routes/adminRoutes.js")(app);
require("./routes/htmlRoutes.js")(app);
//-------------------------------------------------------------------------Comments





var syncOptions = {
    force: false
};
 
// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
    // syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
    app.listen(PORT, function () {
        console.log(
            "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
            PORT,
            PORT
        );
    });
});
