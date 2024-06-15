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
  none($("#movie-genre-apply"));
  $("#movie-filters-group-apply").className =
    "flex items-center justify-center gap-4 w-full py-4 px-2";
});

movieGenre.addEventListener("change", function () {
  this.checked = true;
  movieList.checked = false;
  none(movieListBox);
  flex(genreFilterBox);
  block($("#movie-genre-apply"));
  $("#movie-filters-group-apply").className =
    "grid grid-cols-2 items-center justify-center gap-4 w-full py-4 px-2";
});

movieList.click();


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



