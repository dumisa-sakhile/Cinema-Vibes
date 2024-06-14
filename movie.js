import {
  $,
  $$,
  none,
  flex,
  grid,
  block,
  alert,
  createMovieCard,
  showSearchBox,
} from "./utilities.js";
import "./movie-fetch.js"

const movieList = $("#movie-list-filter");
const movieGenre = $("#movie-genre-filter");
const genreFilterBox = $("#movie-genre-box");
const movieListBox = $("#movie-list-box");

movieList.addEventListener("change", function () {
  this.checked = true;
  movieGenre.checked = false;
  flex(movieListBox);
  none(genreFilterBox);
});

movieGenre.addEventListener("change", function () {
  this.checked = true;
  movieList.checked = false;
  none(movieListBox);
  flex(genreFilterBox);
});

movieGenre.click();

const movieGenres = [
  { name: "Action", id: 28, query: "28" },
  { name: "Adventure", id: 12, query: "12" },
  { name: "Animation", id: 16, query: "16" },
  { name: "Comedy", id: 35, query: "35" },
  { name: "Crime", id: 80, query: "80" },
  { name: "Documentary", id: 99, query: "99" },
  { name: "Drama", id: 18, query: "18" },
  { name: "Family", id: 10751, query: "10751" },
  { name: "Fantasy", id: 14, query: "14" },
  { name: "History", id: 36, query: "36" },
  { name: "Horror", id: 27, query: "27" },
  { name: "Music", id: 10402, query: "10402" },
  { name: "Mystery", id: 9648, query: "9648" },
  { name: "Romance", id: 10749, query: "10749" },
  { name: "Sci-Fi", id: 878, query: "878" },
  { name: "TV Movie", id: 10770, query: "10770" },
  { name: "Thriller", id: 53, query: "53" },
  { name: "War", id: 10752, query: "10752" },
  { name: "Western", id: 37, query: "37" },
];

movieGenres.map((genre) => {
  const span = document.createElement("span");
  span.id = genre.id;
  span.setAttribute("data-query", genre.query);
  span.textContent = genre.name;
  span.classList = "filter-disabled";
  genreFilterBox.appendChild(span);
});

// close Filters Group
$("#movie-filters-group-close").addEventListener("click", () => {
  none($("#movie-filters-group"));
});
// close Filters Group

// open Filters Group
$("#movie-filter").addEventListener("click", () => {
  flex($("#movie-filters-group"));
});
// open Filters Group

$$(`#movie-genre-box span`).forEach((span) => {
  span.addEventListener("click", function (ev) {
    ev.currentTarget.classList.toggle("filter-active");
    ev.currentTarget.classList.toggle("filter-disabled");
  });
});

