var animals = ["giraffe", "horse", "kangaroo", "mouse", "ostrich", "alligator"];
function renderButtons() {
    $("#buttons").empty();

    for (var i = 0; i < animals.length; i++) {

      var newButton = $("<button>");
      newButton.attr("dataAnimal", animals[i]);
      newButton.attr("class", "clickMe")
      newButton.text(animals[i]);
      $("#buttons").append(newButton);
    }
  }

  $("#addButton").on("click", function(event) {
    var newAnimal = $("#inputForm").val().trim();
    var newButton = $("<button>");
    
    animals.push(newAnimal);
    newButton.attr("dataAnimal", newAnimal);
    newButton.attr("class", "clickMe")
    newButton.text(newAnimal);
    $("#buttons").append(newButton);

    //renderButtons();

});
renderButtons();


$("body").on("click", ".clickMe", function() {    

    var animal = $(this).attr("dataAnimal");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      animal + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        var results = response.data;
        console.log(response)

        //for loop to get results from API 
        for (var i = 0; i < results.length; i++) {
            //weeding out R rated gifs
            if (results[i].rating !== "r") {
          
                //setting variables to put gif results on page
                var gifDiv = $("<div class='item'>");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                var animalImage = $("<img>");

                //adding attributes to gifs that will allow me to animate and stop them
                animalImage.attr("src", results[i].images.fixed_height_still.url);
                animalImage.attr("data-state", "still");
                animalImage.attr("data-animate", results[i].images.fixed_height.url);
                animalImage.attr("data-still", results[i].images.fixed_height_still.url);
                animalImage.attr("class", "gif col-md-8");
                

                //adding gifs to DOM
                gifDiv.prepend(p);
                gifDiv.prepend(animalImage);
                $("#gifPlace").prepend(gifDiv);
            }  
        }
        $("body").on("click",".gif", function() {
              console.log("clicked")      
            var state = $(this).attr("data-state")
        
              if (state === "still") {
                  var animate = $(this).attr("data-animate")
                  $(this).attr("src", animate )
                  $(this).attr("data-state", "animate")
                }
              else {
                  var still = $(this).attr("data-still")
                  $(this).attr("src", still)
                  $(this).attr("data-state", "still")
                }
        });
            //making gifs clickable to change their state from still to animated        
    });


});






