$( document ).ready(function() {

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
  
  
  // // This is for POST Method
  // $("#dash-events-div").on("click", function(event) {
  //   event.preventDefault();
  
  
  
  //   // send an AJAX POST-request with jQuery
  //   $.get("/events/:id")
  //   // on success, run this callback
  //   .then(function(data) {
  
  //     console.log(data)
  //     console.log( "evento que viene del click en div event" + data);
  //     // log the data we found
  //     // console.log(data);
  
  //     window.location = data.attending.url;
  //     // console.log(data.url);
  //     // tell the user we're adding a character with an alert window
  //   });
  // });
  
  $("#login-submit").on("click", function (event) {
    event.preventDefault();
  
    var user = {
      email: $("#login-email").val().trim(),
      password: $("#login-password").val().trim(),
    };
    console.log(user);
  
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


