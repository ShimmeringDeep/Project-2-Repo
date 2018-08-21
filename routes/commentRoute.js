var db = require("../models");

module.exports = function (app) {
    // Load index page
    app.post("api/newComment", function (req, res) {
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
        }).then(function(dbExamples) {
            res.json(dbExamples);
        });
    });
};