$(document).ready(()=> {
 const pollId = window.location.href.slice(37); // Getting the id

//Creating the Form with all the informations by id
const generateDiv = (poll) =>{
  $(".askButton").before(`<label for="exampleInputEmail1">Your title was:</label>
  <input type="text" class="form-control" id="pollTitle" value="${poll.pollname}"
   aria-describedby="emailHelp" placeholder="Enter the Title"/>
  <label for="exampleInputEmail1">Your Email address</label>
  <input type="email" class="form-control" id="useremail" aria-describedby="emailHelp" 
  value="${poll.email}">
  <br/>`);
  addOption(poll); //looping through the options array and rendering options
};
//Checking which option should be render
const pickThePoll = (polls) =>{
  polls.forEach(poll => {
    // console.log(poll.poll_id == pollId)
    if(poll.poll_id == pollId){
      generateDiv(poll);
    }
    return;
  });
};
//Rendering all the options for each ID
const addOption = (poll) =>{
  poll.options.forEach(option =>{
   $("#useremail").after(`
      <label for="inputOption">Options</label>
      <input type="option" id="input${option.optionid}" class="form-control"
       value="${option.name}">${option.name}<br/>`);
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



// let title = $("input#pollTitle").val();
 let pollInfo = {
          name: $("input#pollTitle").val(), 
          options: option
                 };
//Adding Options in case the user want - NOT WORKING YET
let i = 1;
$("#addOption").on('click', function(){
  function input(number) {
    return `input${number}`;
  }
  // alert("working");

  let checkinField = $(`#${input(i)}`).val();
  // checkinField.length > 0 && option.push(checkinField);
  if(!checkinField) {
    alert("Cmon man, that one is empty!! why do you need more ?...");
  } else {
    $(".askButton").before(`<br/><label for="inputOption">Option ${1+i}</label>
       <input type="option" 
      id="${input(++i)}" class="form-control" 
      placeholder="What are your options ?">`);
  }
});


window.onload = function() {
  let useremail = $("#useremail").val();



$("#deleteButton").on('click', (event)=>{
  event.preventDefault();
  $.ajax({
    method: "DELETE",
    url: `/api/polls/delete/${pollId}`,
    data:{
      id: pollId,
      email: useremail
    },
    success: function(data){
      console.log(data);
    }
  }).done((result)=>{
  console.log("Checking", result);

    window.location.href = "/";
  });


});

};
//NOT WORKING YET
$("#editPoll").on('submit', (event)=>{
  console.log(pollInfo);
  event.preventDefault();
    // alert("working");
    $.ajax({
      method: "PUT",
      url: `/api/polls/edit/${pollId}`,
      data: pollInfo,
    }).done((result)=>{
      console.log("Updated");
    });
});

























});