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




// close Filters Group
$("#movie-filters-group-close").addEventListener("click", () => {
  none($("#movie-filters-group"));
});
// close Filters Group

// open Filters Group
$("#movie-filter").addEventListener("click", () => {flex($("#movie-filters-group"));});
// open Filters Group



