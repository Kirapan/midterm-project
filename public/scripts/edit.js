$(document).ready(() => {
  const pollId = window.location.href.slice(37); // Getting the id
  //Creating the Form with all the informations by id
  const generateDiv = (poll) => {
    $(".askButton").before(`<label for="exampleInputEmail1">Your title was:</label>
  <input type="text" class="form-control" id="pollTitle" poll_id=${poll.poll_id} value="${poll.pollname}"
   aria-describedby="emailHelp" placeholder="Enter the Title" value="OKAY"/>
  <label id="emailaddress" data-email="${poll.email}" for="exampleInputEmail1">Your Email address</label>
  <input type="email" class="form-control" id="useremail" aria-describedby="emailHelp" 
  placeholder="Please Enter Email!">
  <br/>`);
    addOption(poll); //looping through the options array and rendering options
  };
  //Checking which option should be render
  const pickThePoll = (polls) => {
    polls.forEach(poll => {
      if (poll.poll_id == pollId) {
        generateDiv(poll);
      }
      return;
    });
  };
  //Rendering all the options for each ID
  const addOption = (poll) => {
    poll.options.forEach(option => {
      $("#useremail").after(`
      <label for="inputOption">Option</label>
      <input type="option" data-optionid="${option.optionid}" class="form-control input1"
      value="${option.name}"><br/>`);
      return;
    });
  };
  //Making the Ajax Request to retrieve all the data
  $.ajax({
    method: "GET",
    url: "/api/polls/all",
  }).done((polls) => {
    pickThePoll(polls);
  });
  //when the form is submited 
  var option = [];
  let i = 1;
  function input(number) {
    return `input${number}`;
  }
  $("#addOption").on('click', function () {
    let checkinField = $(`.${input(i)}`).val();
    checkinField.length >0 && option.push(checkinField);
    if (!checkinField) {
      alert("Cmon man, that one is empty!! why do you need more ?...");
    } else {
      $(".askButton").before(`<br/><label for="inputOption">Option</label>
      <input type="option" 
      class="form-control input1"
      data-optionid="dummy"
      placeholder="What are your options ?">`);
    }
  });

  $("#deleteButton").on('click', (event) => {
    event.preventDefault();
    let urlID = $("#pollTitle").attr('poll_id');
    let useremail = $("#useremail").val();
    $.ajax({
      method: "DELETE",
      url: `/api/polls/delete/${urlID}`,
      data: {
        id: urlID,
        email: useremail
      }
    })
    window.location.href = '/';

  });

//NOT WORKING YET
$("#editPoll").on('submit', (event)=>{
  event.preventDefault();
  if ($("#useremail").val()=== $('#emailaddress').attr('data-email')) {
    let polldata ={};
    let optionHolder = {};
    let optionArray =[];
    $('.input1').each(function (input){
      let optionid = $(this).attr('data-optionid')
      let optionname = $(this).val();
      optionHolder = {optionid, optionname}
      optionArray.push(optionHolder);
    })
    let pollInfo = {
      title: $("input#pollTitle").val(), 
      options: optionArray
             }
    console.log("pollpoll",pollInfo);
      $.ajax({
        method: "PUT",
        url: `/api/polls/edit/${pollId}`,
        data: pollInfo,
      }).done((result)=>{
        // window.location.href = `/api/polls/results/${pollId}`;
      });
  } else {
    alert('Email not found!');
  }
  })
});