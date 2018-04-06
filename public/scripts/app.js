// options.push($(".input1").val())
$(document).ready(()=>{
  
  
    
  
  // $('#seeResult').mousedown(()=>{
    //   $("#realResults").scrollIntoView({behavior: "instant"});
    // });
    
    // $("ul.nav li a").click(function(event) {
      //     // event.preventDefault();
      //     alert("heeeey");
      //     $('body').scrollTo('#realResults');
      //   });
      
      // $('#seeResult').click(function () {
        //     $("html, body").animate({
          //         scrollTop: $("realResults")
          //     }, 600);
//     return false;
// });
const generateDiv = (poll) =>{
   $("div.features").append(`<div class="col-md-3 col-sm-6 hero-feature">
                <div class="thumbnail">
                    <img src="http://placehold.it/800x500" alt="">
                    <div class="caption">
                        <h3>${poll.name}</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                        <p>
                            <a href="#" class="btn btn-primary">Buy Now!</a> <a href="#" class="btn btn-default">More Info</a>
                        </p>
                    </div>
                </div>
            </div>`);
}

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

console.log('beep', pollInfo);
 if (!useremail) {
  alert("Hey, We need your email!");

 }
   $.ajax({
    method: "POST",
    url: "/api/polls/new",
    data: pollInfo
  }).done((result) => {
    console.log(result);
  });
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


$("#removeOption").on('click', function(){
  // alert("working");
  $(`#input${i}`).empty();
  i--;
});

$("#createPoll").on('submit', (event)=>{
  event.preventDefault();
  $("#formPoll").slideToggle();
  
});



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
