$(document).ready(() => {
  const pollId = window.location.href.slice(37); // Getting the id
  //Creating the Form with all the informations by id
  const generateDiv = (poll) => {
    $(".askButton").before(`<label for="exampleInputEmail1">Your title was:</label>
  <input type="text" class="form-control" id="pollTitle" poll_id=${poll.poll_id} value="${poll.pollname}"
   aria-describedby="emailHelp" placeholder="Enter the Title" value="OKAY"/>
  <label id="emailaddress" for="exampleInputEmail1">Your Email address</label>
  <input type="email" class="form-control" id="useremail" aria-describedby="emailHelp" 
  value="${poll.email}">
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
      <label for="inputOption">Options</label>
      <input type="option" data-optionid="${option.optionid}" class="form-control"
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

  $("#addOption").on('click', function () {
    function input(number) {
      return `input${number}`;
    }
    let checkinField = $(`#${input(i)}`).val();
    // option.push(checkinField);
    checkinField.length > 0 && option.push(checkinField);
    if (!checkinField) {
      alert("Cmon man, that one is empty!! why do you need more ?...");
    } else {
      $(".askButton").before(`<br/><label for="inputOption">Option ${1 + i}</label>
      <input type="option" 
      id="${input(++i)}" class="form-control" 
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
  $(".askButton").on('click', (event) => {
    let pollInfo = {
      name: title,
      options: option
    };
    var option = [];
    let i = 1;
    let title = $("#pollTitle").val();
    console.log('title', title);
    event.preventDefault();
    console.log(pollInfo);
    $.ajax({
      method: "PUT",
      url: `/api/polls/edit/${pollId}`,
      data: pollInfo,
    }).done((result) => {
      console.log("Updated");
    });
  });
});