/*global $*/

var topics = ["halo 5", "jack sparrow", "adulting"];

var baseURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=10&rating=pg-13&q=";

function createButtons() {
for (var i = 0; i < topics.length; i++) {
  $("#buttons").append('<button' + ' data-topic = "' +  topics[i] + 
    '" type = "button" class="btn btn-default">' 
    + topics[i] + '</button>');
     
  }
}


function callAPI(selectedTopic) {
  var newURL = baseURL;
  newURL = (baseURL + selectedTopic).split(" ").join("+");
  console.log(newURL);
  
  $.get(newURL, function(data) {
    console.log(data);
    post(data);
  
  });
}  

// Parse out and push data returned by API call to page
function post(data) {

  var still;
  var animated;
  var rating;
  var title;

  for (var j = 0; j < data.data.length; j++) {
    
    still = data.data[j].images.fixed_height_still.url;
    animated = data.data[j].images.fixed_height.url;
    rating = data.data[j].rating;
    title = data.data[j].title;
    
    $("#post").append("<div class = 'thumbnail'></div>");
      $("#post .thumbnail").eq(j).append("<img>");
      
      $("#post .thumbnail img").eq(j).attr({
        
        "src": still, 
        "data-still": still, 
        "data-animated": animated, 
        "alt": title
        
      });
      
      $("#post .thumbnail").eq(j).append("<div class = 'caption'><h3>Rating: " + 
        rating.toUpperCase() + "</h3>");
  }
}


// Run On Page Load
$(function() {
  
  // Function call to create initial topic buttons
  createButtons();
  
  //User add new topic
  $("#add").click(function() {
    
    if ($("#newTopic").val() === "") {
      alert("Enter a search term");
      
    } else if (topics.includes($("#newTopic").val().toLowerCase())) {
      alert("Topic already included");
      
    } else {
      topics.push($("#newTopic").val().toLowerCase());
      
      $("#buttons").empty();
      createButtons();
      
      $("#newTopic").val("");
      
    }
    
    
  });
  
  
  // User topic button click event
  $("#buttons").on("click", "button", function() {
    
    $("#post").empty();
    
    var selectedTopic = $(this).data("topic");
    console.log(selectedTopic);
    
    callAPI(selectedTopic);
    
  });
  
  //Play or pause loaded GIFs
  $(document).on("click", "img", function() {
    
    var currentType = $(this).attr("src");
    var still = $(this).data("still");
    var animated = $(this).data("animated");
    
    if (currentType === still) {
      $(this).attr("src", animated);
      
    } else if (currentType === animated) {
      $(this).attr("src", still);
    }
    
  });
    
});