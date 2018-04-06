$(document).ready(()=>{
//Getting the informations to edit page
$(() => {
  $.ajax({
    method: "GET",
    url: `/api/polls/edit/`,
    success: function(polls){
            $("div.options").append(`<label for="exampleInputEmail1">
                            Your title is
                          </label>
                     <input type="text" class="form-control" id="pollTitle"
                        aria-describedby="emailHelp" placeholder="Enter the Title" 
                        value="${pollid.optionsname}">
                    <br/><input type="email" class="form-control" id="useremail" 
                    aria-describedby="emailHelp" value="${pollid.useremail}">
                    ${polls.forEach((poll) => {
                        if(poll.id === pollid) {
                          let infoPoll = {
                            title: poll.name,
                            options: getPollinfor(pollid),
                          };
                        }
                      })
                    }`);
            } 
    });
});

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

// Editing page
$("#editPoll").on('submit', function(event){
  event.preventDefault();
  $.ajax({
    method: "POST",
    url: `/api/polls/edit/:${pollid}`
  })
})

//Deleting a poll 
// ...
//Creating all the polls and sending to the index.ejs
const generateDiv = (poll) =>{
   $("div.features").append(`<div class="col-md-3 col-sm-6 hero-feature">
                <div class="thumbnail">
                    <img src="http://placehold.it/800x500" alt="">
                    <div class="caption">
                        <a href="/api/polls/votes/${poll.id}"><h3>${poll.name}</h3></a>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
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
$("#newPoll").on('submit', (event)=>{
 event.preventDefault();
 option.push($(`#input${i}`).val());
 // alert("working")
 let title = $("#pollTitle").val();
 let userEmail = $("#useremail").val();

 let pollInfo = {
                  name: title, 
                  email: userEmail,
                  options: option
                 };

      if (!pollInfo.name || !pollInfo.email || !pollInfo.options) {
          alert("working!")
      }else{
 if (!useremail) {
  alert("Hey, We need your email!");

 }
   $.ajax({
    method: "POST",
    url: "/api/polls/new",
    data: pollInfo
  }).done((result) => {
    console.log("POSTED!");
    });
      }
  });
 let title = $("#pollTitle").val();
 let userEmail = $("#useremail").val();
 
 let pollInfo = {
                  name: title, 
                  email: userEmail,
                  options: option
                 };
console.log(pollInfo)
});

var option = [];
let i = 1;
//Adding options to the poll
$("#addOption").on('click', function(){
  function input(number) {
    return `input${number}`;
  }
  let checkinField = $(`#${input(i)}`).val();
  checkinField.length > 0 && option.push(checkinField);
  if(!checkinField) {
    alert("Cmon man, that one is empty!! why do you need more ?...")
  } else {
    $(".askButton").before(`<br/><label for="inputOption">Option ${1+i}</label>
       <input type="option" 
      id="${input(++i)}" class="form-control" 
      placeholder="What are your options ?">`);
  }
});
//Editing the Poll


//test to be updated
$(()=>
  {
  $('#testdrag').draggable();
  $('#testdrop').droppable({
    drop: function(event,ui) {
      $(this).text('dropped');
      let option = $('#testdrag').attr('option')
      $(this).attr('option',option);
    }
  })
  });

$("#removeOption").on('click', function(){
  // alert("working");
  $(`#input${i}`).empty();
      i--;
});
  
$("#createPoll").on('submit', (event)=>{
event.preventDefault();
$("#formPoll").slideToggle();
});




