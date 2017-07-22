$(document).ready(function() {
  // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
  /*$('.view').click(function (){
  	$('#modal1').modal('open');
  	alert('edskjcxnm');
  });*/
  /*$('.view').leanModal();*/
  $('.modal').modal();

  // var slider = document.getElementById('test-slider');
  // noUiSlider.create(slider, {
  //  start: [20, 80],
  //  connect: true,
  //  step: 1,
  //  orientation: 'horizontal', // 'horizontal' or 'vertical'
  //  range: {
  //    'min': 0,
  //    'max': 100
  //  },
  //  format: wNumb({
  //    decimals: 0
  //  })
  // });
var timeCounter = 250;
var searches = ["missouri", "kentucky", "california", "texas", "alabama", "georgia", "montana", "wyoming", "colorado", "nebraska", "arizona"];

  //$("#park-search").on("click", function () {

    for (var i = 0; i < searches.length; i++) {

      var returnResults = $("#result-" + i);
      returnResults.attr("data-search" +searches[i]);
      var newResultDiv = $("<a href='#!' class='modal-action modal-close waves-effect         waves-green btn-flat col m12'>" + "<h5>" + searches[i] + "</h5>"+ "</a>");

      returnResults.html(newResultDiv);

      timeCounter += 250;
      $("#result-" + i).velocity("transition.slideUpIn", { stagger: timeCounter });
    }

  //};

});

//Code Which Generates the Google map
function initMap() {
  //Settings for our map
  var options = {
    zoom: 7,
    center: {lat: 35.2295948, lng: -80.8359465}
  }

  map = new google.maps.Map(document.getElementById('map'), options);
}
