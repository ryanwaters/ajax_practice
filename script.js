// load the window
window.onload = function() {

  var searchForm      = document.getElementById("search");
  var queryInput      = document.getElementById("query");
  var resultsList     = document.getElementById("results");
  var anchor          = document.getElementById("matrix");
  var posterContainer = document.getElementById("poster")

  searchForm.onsubmit = function(e) {
    e.preventDefault();

    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (request.readyState === 4 && request.status === 200) {
        var results = JSON.parse(request.response);
        var movies  = results["Search"];
        resultsList.innerHTML = "";
        for (var i = 0; i < movies.length; i++) {
          var movie = movies[i];
          
          var movieListItem = document.createElement("li");
          var movieAnchor   = document.createElement("a");

          movieAnchor.setAttribute("href", "http://www.imdb.com/title/" + movie["imdbID"])
          movieAnchor.innerText = movie["Title"] + " (" + movie["Year"] + ")";
          movieAnchor.addEventListener("click", function(event) {
            event.preventDefault();

            posterContainer.innerHTML = "";

            var request = new XMLHttpRequest();
            request.onreadystatechange = function() {
              if (request.readyState === 4 && request.status === 200) {
                var movie = JSON.parse(request.response);
                var poster = document.createElement("img");
                poster.setAttribute("src", movie["Poster"]);
                poster.setAttribute("alt", movie["Title"] + " Poster");
                posterContainer.appendChild(poster);
              }
            }

            var imdbId = event.target.href.split("title/")[1];
            request.open("GET", "http://omdbapi.com/?i=" + imdbId);
            request.send();
          });

          movieListItem.appendChild(movieAnchor);
          resultsList.appendChild(movieListItem);
        }
      }
    }
    request.open("GET", "http://omdbapi.com/?s=" + queryInput.value);
    request.send();
  };
}