// load the window
window.onload = function() {

  // get user inputs from form
  var searchForm = document.getElementById('search');
  var queryInput = document.getElementById('query');
  var moviesList = document.getElementById('moviesList');
  var resultsDiv = document.getElementById('results');
  
  
  searchForm.onsubmit = function(e) {
    e.preventDefault();

    // 
    var query = queryInput.value;  
    var request = new XMLHttpRequest();
    request.open('Get', 'http://omdbapi.com/?s=' + query)

    request.onreadystatechange = function() {
      if (request.readyState === 4 && request.status === 200) {
        movieResults = request.response;
        parsedMovies = JSON.parse(movieResults)
        moviesList.innerHTML = "" // stops from duplicating results on multiple submits
        for (var i = 0; i < parsedMovies.Search.length; i++) {
          var list = document.createElement('li');
          var movieTitle = document.createTextNode(parsedMovies.Search[i]['Title'] + " ");
          var movieYear = document.createTextNode(parsedMovies.Search[i]['Year']);
          var imdbID = document.createTextNode(parsedMovies.Search[i]['imdbID']);
          list.appendChild(movieTitle);
          list.appendChild(movieYear);

          moviesList.appendChild(list);
          
        }

      }
    }
    request.send()
  }
}