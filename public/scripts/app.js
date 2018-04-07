$(document).ready(() => {
  let i = 1;
  //voting page
  function createVote(id, content) {
    return `<div class="drag" option_id="${id}">${content}</div>`
  }
  function createBox(i, point) {
    return `<div class="drop" point="${point}">Rank ${i}</div>`
  }

const getPollinfor = (poll) => {
  $("div.options").append(`<label for="exampleInputEmail1">
                            Your title is
                          </label>
                     <input type="text" class="form-control" id="pollTitle"
             aria-describedby="emailHelp" placeholder="Enter the Title" value="${pollid.name}">
                    <label for="exampleInputEmail1">Your Email address</label>
            <input type="email" class="form-control" id="useremail" aria-describedby="emailHelp" value="${pollid.email}">
                <br/><label for="inputOption">Option ${pollid.optionid}</label>
                 <input type="option" 
                id="input${pollid.optionid}" class="form-control" 
                placeholder="What are your options ?">
                              </div>
                </div>
            </div>`);
}

const generateDiv = (poll) => {
  return $("div.features").append(`<div class="col-md-3 col-sm-6 hero-feature">
                <div class="thumbnail">
                    <img src="http://placehold.it/800x500" alt="">
                    <div class="caption">
                      <a href="/api/polls/result/${poll.poll_id}"><h3>${poll.pollname}</h3></a>
                        <p class="url" pollurl="vote-${poll.poll_id}">localhost:8080/api/polls/votes/${poll.poll_id}</p>
                        <p>
                            <a href="#" class="btn btn-primary">Buy Now!</a> <a href="#" class="btn btn-default">More Info</a>
                        </p>
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
var option = [];
//Adding options to the poll
$("#addOption").on('click', function () {
  function input(number) {
    return `input${number}`;
  }
  let checkinField = $(`#${input(i)}`).val();
  // option.push(checkinField);
  checkinField.length > 0 && option.push(checkinField);
  if (!checkinField) {
    alert("Cmon man, that one is empty!! why do you need more ?...")
  } else {
    $(".askButton").before(`<br/><label for="inputOption">Option ${1 + i}</label>
       <input type="option" 
      id="${input(++i)}" class="form-control" 
      placeholder="What are your options ?">`);
  }
});
$("#newPoll").on('submit', (event) => {
  event.preventDefault();
  option.push($(`#input${i}`).val());
  // alert("working")
  let title = $("#pollTitle").val();
  let userEmail = $("#useremail").val();

  const data = {
    from: `Chill Poll <${useremail}>`,
    to: 'strangesm@gmail.com',
    cc: 'mateuscbraga@gmail.com',
    subject: 'What to do on this friday ? (Title of the poll)',
    text: 'You just got asked about Netflix for this friday! (here will be the link to vote'
  };

  let pollInfo = {
    name: title,
    email: userEmail,
    options: option
  };

  if (!pollInfo.name || !pollInfo.email || !pollInfo.options) {
    alert("working!")
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
        console.log("POSTED!");
      });
    location.reload();
  }
});

$("#removeOption").on('click', function () {
  // alert("working");
  $(`#input${i}`).empty();
  i--;
});

$("#createPoll").on('submit', (event) => {
  event.preventDefault();
  $("#formPoll").slideToggle();
});

})
