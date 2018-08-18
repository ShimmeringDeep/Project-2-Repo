const request = require('ajax-request');
let db = require("../models");

module.exports = function (app) {

    app.post("/admin", function (req, res) {
        const eventkey = "WVV7pQ6XZXdVrR9r" //eventful API key
        let eventUrl = "http://api.eventful.com/json/events/search" //query url for eventful

        eventUrl += '?' + $.param({ //parameters for eventful query (we need a few more of these to make the returns cleaner)
            'app_key': eventkey,
            'location': locationInput,
            'date': 'thisweek',
            'category': 'music , comedy, festivals_parades, food, art, holiday, singles_social, outdoors_recreation, sports',
            'sort_order': 'popularity',
            'mature': 'normal',
            'page_size': 25,
        })

        // });
        request({
            url: eventUrl,
            method: 'GET',
            dataType: 'jsonp'
        }).then(function (err, res, body) { //after ajax query to eventful
            var events = body.events.event; //grabs the location in the result where the events from our query are stored
            console.log(events);


                var checkArr = [];
                db.Event.findAll({}).then(function (result) {
                    result.forEach((val) => {
                        checkArr.push(val.eventfulID)

                        for (var i = 0; i < events.length; i++) { //for loop populates the DOM and firebase with our returned events
                            var event = events[i]; //grabs the event in the event array at location [i]
                            var eventObj = {
                                title: event.title,
                                venue: event.venue_name,
                                date: event.start_time,
                                address: event.venue_address,
                                description: event.description,
                                eventfulID: event.id,
                            };

                            if (!checkArr.includes(eventObj.eventfulID)) {
                                db.Event.create(eventObj).then(function (res){


                                })
                            }
                        }
                    });
                });
            });
        })




}