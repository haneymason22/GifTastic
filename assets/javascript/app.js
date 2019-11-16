var topics = ["Solid Snake", "Commander Shepard", "Samus", "Mario", "Lara Croft", "John Marston", "Nathan Drake", "Kratos", "Max Payne", "Link", "Kirby", "Ezio Auditore", "Sonic"]
function displayTopicsGifs() {
    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    topic + "&api_key=Ft7Qc8BXF6xDcg9Kytz4NGHGKM8igMHe";
    $.ajax({
        url: queryURL,
        method: "GET"
      })
        
        .then(function(response) {

            $("#gifs").empty();
          
          var results = response.data;

         
          for (var i = 0; i < results.length; i++) {

           
            if (results[i].rating !== "r") {
              
            var gifDiv = $("<div>");

            gifDiv.addClass("charactergifs");

             
            var rating = results[i].rating;

             
            var p = $("<p>").text("Rating: " + rating);

              
            var characterImage = $("<img>");
                characterImage.attr("src", results[i].images.fixed_height.url);
                characterImage.attr("data-still", results[i].images.fixed_height_still.url);
                characterImage.attr("data-animate", results[i].images.fixed_height.url);
                characterImage.attr("data-state", "still");
                characterImage.addClass("characterImage");

              
            gifDiv.append(p);
            gifDiv.append(characterImage);

              
            $("#gifs").prepend(gifDiv);
            
          };
        };

    });
};
$(".characterImage").on("click", function() {
    
    var state = $(this).attr("data-state");
    
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
});
function renderButtons() {
    $("#buttons-view").empty();

    for (var i = 0; i < topics.length; i++) {
     
      var a = $("<button>");
      
      a.addClass("character-btn");
      
      a.attr("data-name", topics[i]);
     
      a.text(topics[i]);
      
      $("#buttons-view").append(a);
    };
  };
  $("#add-topic").on("click", function(event) {
   
    event.preventDefault();

   
    var character = $("#topic-input").val().trim();
    
    topics.push(character);

    renderButtons();
  });

  
$(document).on("click", ".character-btn", displayTopicsGifs);
renderButtons();