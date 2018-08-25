var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var session = require('express-session');
var methodOverride = require("method-override");
var path = require("path");
var http = require('http');
var passport = require('passport');
var passportConfig = require('./config/passport')

SALT_WORK_FACTOR = 12;
var PORT = process.env.PORT || 8080;
var db = require("./models");
var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
//added from passport.js authentication example
app.use(cookieParser());

//settings from express-session
app.use(session({
    secret: 'asdajhdwaoa23a847aaaoHoAH238aad684yasdasohdes39810',
    resave: false,
    saveUninitialized: false}))
app.use(passport.initialize())
app.use(passport.session())

app.use(methodOverride("_method"));

// Set Handlebars.
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./routes/authenticate.js")(app);
require("./routes/adminRoutes.js")(app);
require("./routes/htmlRoutes.js")(app);

function errorHandler (err, req, res, next) {
	res.status(500)
	res.render('error', { error: err })
  }
//listener
// create default admin user
db.sequelize.sync()//{force:true}
	.then(function(err){
		db.User.find({where: {username: 'admin'}}).then(function (user){
			if (!user) {
				db.User.build({
					username: 'admin', 
					password: 'admin', 
					first_name: 'Test', 
					last_name: 'User'}).save();
			};
		});
		app.listen(PORT, function() {
			console.log("App listening on PORT: " + PORT);
	});
})
