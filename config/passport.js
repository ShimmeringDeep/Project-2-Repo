// var passport = require("passport");
// var LocalStrategy = require("passport-local").Strategy;
// var db = require("../models");

// //Serialize Sessions
// passport.serializeUser(function(user, done){
//     done(null, user);
// });

// //Deserialize Session
// passport.deserializeUser(function(user, done){
//     db.User.find({where:{id: user.id}}).then(function(user){
//         done(null, user);
//     }).error(function(err){
//         done(err,null);
//     });
// });

// //for Authentication purposes
// passport.use("local", new LocalStrategy(
//     function(email, password, done){
//         db.User.find({where: {email : email}}).then(function(user){
//             passwd = user ? user.password : ''
//             isMatch = db.User.validPassord(password, passwd, done, user)
//         });
//     }
// ))