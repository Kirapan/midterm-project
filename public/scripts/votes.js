
$(() => {
  $('.drag').draggable();
  let dropCounter = $('#votescontainer').find('.drag').length;
  let pointsArray = [];
  $('.drop').droppable({
    drop: function (event, ui) {
      $(this).text('dropped');
      let points = $(this).attr('points');
      $(ui.draggable).attr('points', points);
      dropCounter--;
      if (dropCounter === 0 ) {
        $('.drag').each(function () {
          let opnumber = $(this).attr('optionid');
          let pointnumber = $(this).attr('points');
          pointsObj = {
            name: opnumber,
            value: pointnumber
          };
          pointsArray.push(pointsObj);
        })
      }
    }
  })
  $("#pollsubmit").on('click', function () { 
    let result_id = $(".unique").attr('identifier');
      $.ajax({
        method: "POST",
        url: `/api/polls/votes/${result_id}`,
        data: $.param(pointsArray)
    }).done(function (data){
      console.log("ok!");
      window.location.href = `/api/polls/result/${result_id}`;
    })
  })
})