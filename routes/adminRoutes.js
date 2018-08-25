var request = require("ajax-request");
var moment = require("moment")

var db = require("../models");
module.exports = function (app) {
    app.post("/admin", function (req, res) {
        // var eventkey = "WVV7pQ6XZXdVrR9r"; //eventful API key
        var eventUrl = "http://api.eventful.com/json/events/search?app_key=WVV7pQ6XZXdVrR9r&location=houston, tx&date=thisweek&category=music , comedy, festivals_parades, food, art, holiday, singles_social, outdoors_recreation, sports&sort_order=popularity&mature=normal&page_size=25"; //query url for eventful

        request({
                url: eventUrl,
                method: "GET",
                dataType: "jsonp"
            },
            function (err, result, body) {
                //after ajax query to eventful
                if (err) throw err;
                body = JSON.parse(body);
                var events = body.events.event; //grabs the location in the result where the events from our query are stored
                // console.log(events);

                db.Event.findAll({}).then(function (result) {
                    // var checkArr = [];
                    var bulkArr = [];
                    console.log(events.length)
                    // events.forEach(function (val) {
                    // checkArr.push(val.eventfulID);

                    for (var i = 0; i < events.length; i++) {
                        //for loop populates the DOM and firebase with our returned events
                        var event = events[i]; //grabs the event in the event array at location [i]
                        var eventObj = {
                            title: event.title,
                            venue: event.venue_name,
                            date: moment(event.start_time).format("lll"),
                            address: event.venue_address,
                            description: event.description,
                            eventfulID: event.id
                        };
                        // if (!checkArr.includes(eventObj.eventfulID)) {
                        console.log(eventObj);
                        bulkArr.push(eventObj);
                        // }
                    }
                    // });
                    // console.log(bulkArr)
                    db.Event.bulkCreate(bulkArr).then(function () {
                        res.end();
                    })
                });
            });
    });

    app.put("/admin/", function (req, res) {
        db.Event.update(req.body, {
            where: {
                id: req.body.id
            }
        }).then(function (dbEvent) {
            res.json(dbEvent);
        })
    });

    app.delete("/admin/:id", function (req, res) {
        db.Event.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (eventDelete) {
            res.json(eventDelete);
        })
    });
};
