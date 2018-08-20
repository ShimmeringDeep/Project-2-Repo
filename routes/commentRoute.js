var db = require("../models");

module.exports = function (app) {
    // Load index page
    app.post("api/comment", function (req, res) {
        db.Comment.create(req.body).then(function (comment) {
            res.json(comment);
        });
    });

    app.get("/:eventid", function(req, res) {
        db.Comment.findAll({
            where: {
                isGoing : true,
                include : [db.Event , db.User]
            }
        }).then( function (comments){
            res.json(comments);
        });
    });
};