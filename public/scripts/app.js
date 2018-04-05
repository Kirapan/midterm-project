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

$("#createPoll").on('submit', (event)=>{
event.preventDefault();
$("#formPoll").slideToggle();
  $.ajax({
    method: "post",
    url: "/api/polls/new"
  }).done((result) => {
    loadPoll();
    })
});

