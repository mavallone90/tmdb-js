const root = document.querySelector(".site-wrap");
const feed = "https://letterboxd.com/itsmeyouknow/rss/";
const movieid_test = ["587807", "495764", "107", "1398", "10098"];
const tmdb_apikey = "a735bdf539e3961056f00ec379922d26";

const mainDiv = document.querySelector(".Movies");
const titleDiv = document.querySelector(".TitleInfo");
const posterDiv = document.querySelector(".Poster");
const castDiv = document.querySelector(".Cast");
const taglineDiv = document.querySelector(".Tagline");

const currentID = movieid_test[2];

//search for movie:
const searchTitle = "Birdman"; // Need spaces to be accepted
const searchYear = "2014";
const movieRequest = `https://api.themoviedb.org/3/search/movie?api_key=${tmdb_apikey}&language=en-US&query=${searchTitle}&page=1&include_adult=false&year=${searchYear}&primary_release_year=${searchYear}`;
console.log(movieRequest);

const detailsRequest = `https://api.themoviedb.org/3/movie/${currentID}?api_key=${tmdb_apikey}&language=en-US`;
console.log(detailsRequest); // Movie Details
const popularRequest = `https://api.themoviedb.org/3/movie/popular?api_key=${tmdb_apikey}&language=en-US&page=1`;
console.log(popularRequest); // Top Movies
const creditsRequest = `https://api.themoviedb.org/3/movie/${currentID}/credits?api_key=${tmdb_apikey}&language=en-US`;
console.log(creditsRequest); // Credits of movie

//Formate date functions:
var formateDate = function (timestamp) {
  var date = new Date(timestamp);
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[date.getMonth()] + ", " + date.getFullYear();
};

var justYear = function (timestamp) {
  var date = new Date(timestamp);
  return date.getFullYear();
};

// get the top 20 most popular movies
// fetch(popularRequest)
//   .then((da_response) => da_response.json())
//   .then((dat_json) => topMovies(dat_json));

// function topMovies(data) {
//   data.results.forEach(function (movie) {
//     var topMovies = document.createElement("div");
//     topMovies.className = "toptwenty";
//     topMovies.innerHTML = `<h1>${movie.original_title}</h1>`;
//     mainDiv.prepend(topMovies);
//   });
// }

// get movie ID
fetch(movieRequest)
  .then((da_response) => da_response.json())
  .then((dat_json) => idMovie(dat_json));

function idMovie(data) {
  console.log("Movie ID is", data.results[0].id);
}

// get title, tagline, poster and release date
fetch(detailsRequest)
  .then((da_response) => da_response.json())
  .then((dat_json) => detailMovie(dat_json));

function detailMovie(data) {
  var titleMovie = document.createElement("div");
  titleMovie.className = "details";
  titleMovie.innerHTML = `<h1>${data.original_title} (${justYear(data.release_date)})</h1>`;
  titleDiv.prepend(titleMovie);

  var taglineMovie = document.createElement("div");
  taglineMovie.className = "theTagline";
  taglineMovie.innerHTML = `<h2>"${data.tagline}"</h2>`;
  if (data.tagline) {taglineDiv.prepend(taglineMovie);}

  var posterMovie = document.createElement("div");
  posterMovie.className = "thePoster";
  posterMovie.innerHTML = `
  <img src="https://image.tmdb.org/t/p/original${data.poster_path}" />
  <h3>Released in theaters in ${formateDate(data.release_date)}</h3>`;
  posterDiv.append(posterMovie);
}

// Get director, and display 10 top billed cast members and their role
fetch(creditsRequest)
  .then((da_response) => da_response.json())
  .then((dat_json) => creditMovie(dat_json));

function creditMovie(data) {
  data.crew.forEach(function (director) {
    if (director.job == "Director") {
      console.log(director.name);
      var theDirector = document.createElement("div");
      theDirector.className = "theDirector";
      theDirector.innerHTML = `<p>Dir. ${director.name}</p>`;
      titleDiv.append(theDirector);
    }
  });
  data.cast.forEach(function (actor) {
    if (actor.order < 10) {
      var castMember = document.createElement("p");
      castMember.className = "castMember";
      castMember.innerHTML = `<p>${actor.name} as ${actor.character}</p>`;
      castDiv.append(castMember);
    }
  });
}
