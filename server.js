// ------------------------------------------------------------------------------------- <dependencies>
require("dotenv").config();
var fs = require("fs");
var express = require("express");
var bodyParser = require("body-parser");
var bcrypt = require("bcrypt-nodejs");
var path = require("path");
var http = require("http")
var passport = require("passport");
var exphbs = require("express-handlebars");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var session = require("express-session");
var methodOverride = require("method-override");
// var flash = ("connect-flash");

require("./config/passport");

var db = require("./models");
// ------------------------------------------------------------------------------------- </dependencies>

// ------------------------------------------------------------------------------------- <config>
var app = express();
var PORT = process.env.PORT || 3000;

//Authentication
// app.use(flash());
app.use(cookieParser());
app.use(methodOverride());
app.use(session({ secret: "my_precious" }));
app.use(passport.initialize());
app.use(passport.session());

//Serialize Sessions
passport.serializeUser(function(user, done){
    done(null, user);
 });
 
 //Deserialize Session
 passport.deserializeUser(function(user, done){
    db.User.find({where:{id: user.id}}).then(function(user){
        done(null, user.get());
    }).error(function(err){
        done(err,null);
    });
 });
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

// ------------------------------------------------------------------------------------- <routes>
require("./routes/adminRoutes.js")(app);
require("./routes/htmlRoutes.js")(app);






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
