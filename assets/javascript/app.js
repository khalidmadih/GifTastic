$(document).ready(function() {

    var movies = ["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King", "Finding Nemo", "The Godfather"];

    function renderButtons() {
        //Removing extra buttons
        $("#buttons-view").empty();
        //Looping to create buttons & add them to the button list
        for (var i = 0; i < movies.length; i++) {
            var a = $("<button>");
            a.addClass("button btn btn-secondary");
            a.attr("data-name", movies[i]);
            a.attr("id", "leftButton");
            // Providing the initial button text
            a.text(movies[i]);
            // Adding the button to the buttons-view div
            $("#buttons-view").append(a);
        }
        $("button").unbind("click");
        $("button").on("click", fetch_results);
        console.log(movies);
    }

    // Function to add buttons when item is added
    $("#add-item").on("click", function(event) {
        event.preventDefault();
        var movie = $("#item-input").val().trim();
        movies.push(movie);
        renderButtons();

        // Clear input field when focus is removed
        $('input:text').focus(
            function() {
                $(this).val('');
            });
    });

    // Calling the renderButtons function to display the intial buttons
    renderButtons();

    function fetch_results() {
        $("#search-result").empty();
        // Grabbing and storing the data-name property value from the button
        var picture = $(this).attr("data-name");
        $("#title").html("<h4> Results for: " + picture + "</h4>");

        // Constructing a queryURL using the data from the btton
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            picture + "&api_key=dc6zaTOxFJmzC&limit=10";

        // Performing an AJAX request with the queryURL
        $.ajax({
                url: queryURL,
                method: "GET"
            })
            // After data comes back from the request
            .done(function(response) {
                console.log(queryURL);
                console.log(response);
                // storing the data from the AJAX request in the results variable
                var results = response.data;

                // Looping through each result item
                for (var i = 0; i < results.length; i++) {

                    // Creating and storing a div tag
                    var pictureDiv = $("<div>");
                    pictureDiv.attr("id", "imageResult");
                    // pictureDiv.attr("style", "width: 20rem;");
                    pictureDiv.addClass("card");

                    var pictureCard = $("<div>");
                    pictureCard.addClass("cardBody");

                    // Creating a paragraph tag with the result item's rating
                    var p = $("<p>").html("<b>Rating: </b>" + results[i].rating);
                    p.addClass("card-text");

                    // Creating and storing an image tag
                    var Image = $("<img>");
                    // Setting the src attribute of the image tag
                    Image.attr("src", results[i].images.fixed_height_small_still.url);
                    Image.attr("data-still", results[i].images.fixed_height_small_still.url);
                    Image.attr("data-animate", results[i].images.fixed_height.url);
                    Image.attr("data-state", "still");
                    Image.addClass("card-img-top gif");


                    // Appending the paragraph and image tag to the div
                    pictureDiv.append(Image);
                    pictureCard.append(p);
                    pictureDiv.append(pictureCard);

                    // Prependng the Div to the HTML page in the "#search-result" div
                    $("#search-result").prepend(pictureDiv);                  
                    
                }
            });

    }
// function to animate the GIFs
var animateGif = function() {
                        var state = $(this).attr("data-state");
                        console.log(state);

                        if (state == "still") {
                            $(this).attr("src", $(this).attr("data-animate"));
                            $(this).attr("data-state", "animate");
                        } else {
                            $(this).attr("src", $(this).attr("data-still"));
                            $(this).attr("data-state", "still");
                        }

                    };


//Calling the animateGif function 
$(document).on('click', '.gif', animateGif);                    

});