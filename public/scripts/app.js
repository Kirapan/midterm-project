$(() => {
  $.ajax({
    method: "GET",
    url: "/api/polls"
  }).done((polls) => {
    polls.forEach((poll) => {
      $("<div>").text(poll.name).appendTo($("body"));
    })
  });;
});
