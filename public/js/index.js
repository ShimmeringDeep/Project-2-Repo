$(document).ready(function () {
console.log("we loaded");
  $("#signup-submit").on("click", function (event) {

    event.preventDefault();

    var newUser = {
      oauthID: 1.1,
      name: $("#name").val().trim(),
      email: $("#email").val().trim(),
      password: $("#password").val().trim(),
      handle: $("#handle").val().trim(),
      address: $("#address").val().trim()
    };
    console.log(newUser);
    // send an AJAX POST-request with jQuery
    $.post("/dashboard", newUser)
      // on success, run this callback
      .then(function (data) {
        // log the data we found
        // console.log(data);

        window.location = data.url;
        // tell the user we're adding a character with an alert window
      });
  });

// 30.1658° N, 95.4613° W
var map;
function initMap() {
  var myLatLng = {lat: 30.1614351, lng: -95.4643383};
  map = new google.maps.Map(document.getElementById('mapAddress'), {
    center: myLatLng,
    zoom: 8
  });
  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'your event is here!'
  });
}
initMap();



  // This is for POST Method
  $(".dash-events-class").on("click", function (event) {
    event.preventDefault();
    var id = $(this).attr("data-eventId");
    // console.log("id is"+id);
    var newId= id.slice(1,-1);
    console.log("newid "+newId);

    var href = "/events/"+newId;



    // send an AJAX POST-request with jQuery
    $.get("/events/"+newId)
      // on success, run this callback
      .then(function (data) {

        console.log(data)
        console.log("Event that comes when i click on event div" + data);
        // log the data we found
        // console.log(data);

        window.location.href = href;
        // console.log(data.url);
        // tell the user we're adding a character with an alert window
      });
  });





  $("#login-submit").on("click", function (event) {
    event.preventDefault();

    var user = {
      email: $("#login-email").val().trim(),
      password: $("#login-password").val().trim(),
    };
    console.log(user);

  });

  // This is for POST Method
  $(".dash-events-class").on("click", function (event) {
    event.preventDefault();

    var id = $(this).attr("eventId");

    console.log("id dentro del click "+id);

    // send an AJAX POST-request with jQuery
    $.get("/events/:id")
      // on success, run this callback
      .then(function (data) {

        console.log(data)
        console.log("Event that comes when i click on event div" + data);
        // log the data we found
        // console.log(data);

        window.location = data.attending.url;
        // console.log(data.url);
        // tell the user we're adding a character with an alert window
      });
  });


  $("body").on("click", "#comment-submit", function (event) {
    event.preventDefault();

    console.log("dentro del click del boton submit del evento");

    var newComment = {
      userId: 1,
      eventId: 1,
      user_comment: $("#comment_user").val().trim(),
      // isGoing: $('#isGoing:checked').val()
    };
    console.log(newComment);
    // send an AJAX POST-request with jQuery
    $.post("/api/comment/create", newComment)
      // on success, run this callback
      .then(function (data) {
        // log the data we found
        console.log(data);

      });
  });

});



var user = {
  email: $("#login-email").val().trim(),
  password: $("#login-password").val().trim(),
};
console.log(user);



$("#comment-submit").on("click", function (event) {
  event.preventDefault();

  var newComment = {
    userId: 1,
    eventId: 1,
    user_comment: $("#comment").val().trim(),
    isGoing: $('#isGoing:checked').val()

  };
  console.log(newUser);
  // send an AJAX POST-request with jQuery
  $.post("/dashboard", newUser)
    // on success, run this callback
    .then(function (data) {
      // log the data we found
      // console.log(data);

      window.location = data.url;
      // tell the user we're adding a character with an alert window
    });
});