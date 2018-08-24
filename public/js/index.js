

// -------------------------------------------------
  // -------------   ANIMATE TEXT  -------------------
  // -------------------------------------------------

  jQuery(document).ready(function () {

    "use strict";
    animate_text();

  });

  function animate_text() {

    "use strict";

    var animateSpan = jQuery('.animation_text_word');

    animateSpan.typed({
      strings: ["Meet people with inTheBand", "Login and find events near you"],
      loop: true,
      startDelay: 1e3,
      backDelay: 2e3
    });
  }

  // This is for POST Method
  $("#signup-submit").on("click", function(event) {
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
    .then(function(data) {
      // log the data we found
      // console.log(data);

      window.location = data.url;
      // tell the user we're adding a character with an alert window
    });
  });
  
  $("#login-submit").on("click", function(event) {
    event.preventDefault();

  var user = {
    email: $("#login-email").val().trim(),
    password: $("#login-password").val().trim(),
  };
console.log(user);
 
  });


  $("#comment-submit").on("click", function(event) {
    event.preventDefault();

  var newComment = {
    userId: 1,
    eventId: 1,
    user_comment: $("#comment").val().trim(),
    isGoing: $("#password").val().trim(),

  };
console.log(newUser);
  // send an AJAX POST-request with jQuery
  $.post("/dashboard", newUser)
    // on success, run this callback
    .then(function(data) {
      // log the data we found
      // console.log(data);

      window.location = data.url;
      // tell the user we're adding a character with an alert window
    });
  });
