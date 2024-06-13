import './style.css';
import "./tippy.js";
import "./movie.js";
import { $, $$, none, flex, grid, block,alert } from './utilities.js';


const moviesOpen = $("#movies-open");
const tvOpen = $("#tv-open");
const movies = $("#movies");
const tv = $("#tv");
const movieFilter = $("#movieFilter");


tvOpen.addEventListener("click", () => {
  none(movies);
  flex(tv);

  alert("TV Shows", "Welcome to the TV Shows page!",200)

});

moviesOpen.addEventListener("click", () => {
  none(tv);
  flex(movies);

  alert("Movies", "Welcome to the Movies page!", 200);

});

$("#close-alert").addEventListener("click", ()=>{
  none($("#alert"));
})

alert("movie not found","requested movie could not be found",404)