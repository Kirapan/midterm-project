
$(document).ready(() => {
  //voting page
  function createVote(id, content) {
    return `<div class="drag" option_id="${id}">${content}</div>`
  }
  function createBox(i, point) {
    return `<div class="drop" point="${point}">Rank ${i}</div>`
  }


  //Deleting a poll
  // ...
  //Creating all the polls and sending to the index.ejs
  const generateDiv = (poll) => {
    $("div.features").append(`<div class="col-md-6 col-sm-12 hero-feature">
<div class="thumbnail">
<img src="https://source.unsplash.com/1600x900/?${poll.pollname}" alt="">
<div class="caption">
<a href="/api/polls/results/${poll.poll_id}" pollid="${poll.poll_id}" optionid="${poll.id}" rank="${poll.options[0].rank}"><h3>${poll.pollname}</h3></a>
<a href="/api/polls/edit/${poll.poll_id}" class="btn btn-primary">Edit</a>
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
      polls.reverse();
      polls.forEach((poll) => {
        generateDiv(poll);
      })
    });
  });

  //Creating a new poll
  let i = 2;
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
      $(".askButton").before(`<br/><label for="inputOption" class="alsotoDelete" style="font-size: 15px;">Option ${1 + i}</label>
<input type="option" id="${input(++i)}" class="form-control toDelete" placeholder="What are your options ?">`);
    }
  });

  $("#removeOption").on('click', function (event) {
    event.preventDefault();
    if (!$('.toDelete:last').length || $('.toDelete').length <=0) {
      alert("A poll needs at least 2 options!");
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

    if (!pollInfo.name || !pollInfo.email || !pollInfo.options || !$(`#input${i}`).val()) {
      alert("Your information is incomplete!")
    } 
    else {
      if (!useremail) {
        alert("Hey, We need your email!");
      } 
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