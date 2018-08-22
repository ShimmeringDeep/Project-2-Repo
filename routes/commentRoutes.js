var db = require("../models");

module.exports = function (app) {
    // Load index page

    app.post("/api/comment/create", function (req, res) {

        db.Comment.create(req.body).then(function (comment) {
            res.json(comment);
        });
    });

    // app.get("/api/comments", function(req, res) {

        
    //     var eventID = req.body.eventfulID;
      
    //     db.Comment.findAll({
    //         where: {
    //            isGoing: true
    //         },
    //         include: [
    //             {
    //                 model: db.User,
    //             },
    //             {
    //                 model: db.Event,
    //                 where: {
    //                     id: 1
    //                 }
    //             }
    //         ]
    //     }).then(function(results) {
    //         console.log(results.length)
    //         res.json(results);
    //     });
    //   });
    
};

