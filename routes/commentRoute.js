var db = require("../models");

module.exports = function (app) {
    // Load index page

    app.post("/api/comment/create", function (req, res) {

        db.Comment.create(req.body).then(function (comment) {
            res.json(comment);
        });
    });

    app.get("/api/comments", function(req, res) {

        
        var eventID = req.body.eventfulID;
        var userId = req.body.userId;
      

        db.Comment.findAll({
            where: {
               isGoing: true
            },
            include: [
                {
                    model: db.User,
                    where: {
                        id: 1
                    }
                },
                {
                    model: db.Event,
                    where: {
                        id: 1
                    }
                }
            ]

        }).then(function(results) {
            console.log(results, res)
            res.json(results);
        });
      });
    
};


// SELECT users.handle, comments.user_comment
// FROM comments
// INNER JOIN users ON comments.userId = users.id
//  JOIN events ON comments.EventId = events.id
// WHERE comments.isGoing = true 
// ORDER BY comments.timestamp DESC;

