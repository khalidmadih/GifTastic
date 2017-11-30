var movies = ["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King", "Finding Nemo"];

function renderButtons() {
    //Removing extra buttons
    $("#buttons-view").empty();
    //Looping to create buttons & add them to the button list
    for (var i = 0; i < movies.length; i++) {
        var a = $("<button>");
        a.addClass("button btn btn-secondary");
        a.attr("data-name", movies[i]);
        // Providing the initial button text
        a.text(movies[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
    }
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

$("button").on("click", function() {
   $("#search-result").empty();
    // Grabbing and storing the data-name property value from the button
    var picture = $(this).attr("data-name");

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

                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + results[i].rating);

                // Creating and storing an image tag
                var Image = $("<img>");
                // Setting the src attribute of the image to a property pulled off the result item
                Image.attr("src", results[i].images.fixed_height.url);

                // Appending the paragraph and image tag to the animalDiv
                pictureDiv.append(p);
                pictureDiv.append(Image);

                // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                $("#search-result").prepend(pictureDiv);
            }
        });

});