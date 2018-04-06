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




$("#createPoll").on('click', () => {
    $("#formPoll").slideToggle();
});


  let i = 2;
$("#formPoll").on('submit', (event)=>{
 event.preventDefault();
  // i.push(event);
  let $data = {
    option1: $('.op1').val(),
  };
  console.log($data)

  let options = $(`.op${i}`).val();
  // console.log(options);
    // $data.options[i] = optioni.value
  
   $('form').append(`<div><input class='op${i}' name="option${i}" type='text' placeholder='Option ${i}'/></div>`)
      
    // let $data = {
    //   name: event.body.titlePoll,
    // }

    // console.log(event.body);
  // $.ajax({
  //   method: "POST",
  //   url: "/api/polls/new",
  //   data: 123,
  //   success: function(data) {
  //     // console.log(data);
  //   }


  // })
// })




      i++;
})
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
