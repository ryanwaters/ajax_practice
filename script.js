window.onload = function() {

  var searchForm = document.getElementById('search');
  var queryInput = document.getElementById('query');
  var moviesList = document.getElementById('moviesList');
  var resultsDiv = document.getElementById('results');
  var movies;
  var list;


  searchForm.onsubmit = function(e) {
    e.preventDefault();

    var query = queryInput.value;
    var request = new XMLHttpRequest();
    request.open('Get', 'http://omdbapi.com/?s=' + query)

    request.onreadystatechange = function() {
      if (request.readyState === 4 && request.status === 200) {
        movieResults = request.response;
        parsedMovies = JSON.parse(movieResults)

        
        for (var i = 0; i < parsedMovies.Search.length; i++) {
          var list = document.createElement('li');
          var movieTitle = document.createTextNode(parsedMovies.Search[i]['Title']);
          var movieYear = document.createTextNode(parsedMovies.Search[i]['Year']);
          list.appendChild(movieTitle, movieYear);
          moviesList.appendChild(list);
        }
      }
    }
    request.send()
  }
}