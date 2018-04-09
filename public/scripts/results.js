$(document).ready(() => {
  const pollId = window.location.href.slice(40); // Getting the id

  const generateDiv = (poll) => {
    $("#realResults").after(`
    <h2 id="pollTitle" style="color: white;">${poll.pollname}</h2>
    `)
    getOptions(poll.options);
    ;
  };

  const getOptions = (poll) => {
    let sum = 0;
    poll.forEach(function (option) {
      sum += option.rank;
    });
    poll.forEach(option => {
      $("#pollTitle").after(`
      <label style="color: white;">${option.name}</label>
    <div class="progress">
       <div class="progress-bar" role="progressbar"
         aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"
         style="min-width: 2em; font-size: 20px; width:${Math.round(option.rank / sum * 100, 2)}%" id="barOptions">${Math.round(option.rank / sum * 100, 2)}%
       </div>
    </div>`);

    });
  };

  const getPoll = (polls) => {
    polls.forEach(poll => {
      if (pollId == poll.poll_id) {
        generateDiv(poll);
      }
    });
  };

  // Getting All the data
  $.ajax({
    method: "GET",
    url: "/api/polls/all"
  }).done(polls => {
    getPoll(polls);
  })

});