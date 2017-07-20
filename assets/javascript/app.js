$(document).ready(function() {
  // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
  /*$('.view').click(function (){
  	$('#modal1').modal('open');
  	alert('edskjcxnm');
  });*/
  /*$('.view').leanModal();*/
  $('.modal').modal();

var searches = ["missouri", "kentucky", "california", "texas", "alabama", "georgia", "montana", "wyoming", "colorado", "nebraska", "arizona"];

  //$("#park-search").on("click", function () {

    for (var i=0; i<searches.length; i++) {

      var returnResults = $("#result-" + i);
      returnResults.attr("data-search" +searches[i]);
      var newResultDiv = $("<h5>" + searches[i] + "</h5>");

      returnResults.html(newResultDiv);

    }

  //};

});
