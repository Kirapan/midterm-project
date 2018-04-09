
$(document).ready(() => {
  //voting page
  function createVote(id, content) {
    return `<div class="drag" option_id="${id}">${content}</div>`
  }
  function createBox(i, point) {
    return `<div class="drop" point="${point}">Rank ${i}</div>`
  }

  const getPollinfor = (poll) => {
    $("div.options").append(`
<label for="exampleInputEmail1"> Your title is</label>
<input type="text" class="form-control" id="pollTitle"
aria-describedby="emailHelp" placeholder="Enter the Title"
value="${pollid.name}"><label for="exampleInputEmail1">
Your Email address</label><input type="email" class="form-control"
id="useremail" aria-describedby="emailHelp" value="${pollid.email}">
<br/><label for="inputOption">Option ${pollid.optionid}</label>
<input type="option" id="input${pollid.optionid}" class="form-control"
placeholder="What are your options ?"></div></div></div>`)
  }

  //Deleting a poll
  // ...
  //Creating all the polls and sending to the index.ejs
  const generateDiv = (poll) => {
    $("div.features").append(`<div class="col-md-3 col-sm-6 hero-feature">
<div class="thumbnail">
<img src="http://placehold.it/800x500" alt="">
<div class="caption">
<a href="/api/polls/results/${poll.poll_id}" pollid="${poll.poll_id}" optionid="${poll.id}" rank="${poll.options[0].rank}"><h3>${poll.pollname}</h3></a>
</div>
</div>
</div>`);
  }
  //Rendering the Polls on the index.ejs
  $(() => {
    $.ajax({
      method: "GET",
      url: "/api/polls/all"
    }).done((polls) => {
      polls.forEach((poll) => {
        generateDiv(poll);
      })
    });
  });

  //Creating a new poll
  let i = 1;
  var option = [];
  //Adding options to the poll
  function input(number) {
    return `input${number}`;
  }
   function email(iE) {
    return `email${iE}`;
  }
  $("#addOption").on('click', function (event) {
    event.preventDefault();
    let checkinField = $(`#${input(i)}`).val();
    // option.push(checkinField);
    checkinField.length > 0 && option.push(checkinField);
    if (!checkinField) {
      alert("Cmon man, that one is empty!! why do you need more ?...");
    } else {
      $(".askButton").before(`<br/><label for="inputOption" class="alsotoDelete">Option ${1 + i}</label>
<input type="option"
id="${input(++i)}" class="form-control toDelete"
placeholder="What are your options ?">`);
    }
  });

  $("#removeOption").on('click', function (event) {
    event.preventDefault();

    if (!$('.toDelete:last').length) {
      alert("Nothing to delete!");
    } else {
      $('.toDelete:last').remove();
      $('.alsotoDelete:last').remove();
      checkinField = $(`#${input(--i)}`).val();
      option.pop();
    }
  });

  $("#newPoll").on('submit', (event) => {
    event.preventDefault();
    option.push($(`#input${i}`).val());
    let title = $("#pollTitle").val();
    let userEmail = $("#useremail").val();

    let pollInfo = {
      name: title,
      email: userEmail,
      options: option
    };

    if (!pollInfo.name || !pollInfo.email || !pollInfo.options) {
      alert("Your information is incomplete!")
    } else {
      if (!useremail) {
        alert("Hey, We need your email!");
      }
      console.log(pollInfo)
      $.ajax({
        method: "POST",
        url: "/api/polls/new",
        data: pollInfo
      })
        .done((result) => {
          let id = result[0];
          window.location.href = `/api/polls/votes/${id}`
        });
    }
  });

  $("#createPoll").on('submit', (event) => {
    event.preventDefault();
    $("#formPoll").slideToggle();
  });


let iE = 1;
let optionEmail = [];

$("#addEmail").on('click', function(event) {
    event.preventDefault();
    // alert("checkinField")
    let checkinFieldEmail = $(`#${email(iE)}`).val();
    checkinFieldEmail.length > 0 && optionEmail.push(checkinFieldEmail);
    if (!checkinFieldEmail) {
      alert("Cmon man, that one is empty!! why do you need more ?...");
    } else {
      $(this).before(`<br/><label for="inputEmail" id="${email(iE+1)}id">Email ${1 + iE}</label>
       <input type="email" 
      id="${email(++iE)}" class="form-control" 
      placeholder="Which friends ?">`);
    }
  });

$("#removeEmail").on('click', function (event) {
    event.preventDefault();
    alert("delete button")
    if (!$(`#email${iE}`).val()) {
      alert("Nothing to delete!");
    } else {
      $(`#email${iE}`).remove();
      $(`#email${iE}id`).remove();
      checkinFieldEmail = $(`#${email(--iE)}`).val();
      optionEmail.pop();
    }
  });












})