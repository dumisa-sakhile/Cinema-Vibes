import './style.css'
import { $, $$, none, flex, grid, block,alert } from './utilities.js';
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";


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


tippy("#movie-filter", {
  content: "Open movie filters!",
});

tippy("#tv-filter", {
  content: "Open tv filters!",
});


tippy("#tv-open", {
  content: "Switch to TV Shows!",
});

tippy("#movie-open", {
  content: "Switch to the Movies!",
});

tippy("#close-alert", {
  content: "Close!",
});

$("#close-alert").addEventListener("click", ()=>{
  none($("#alert"));
})

alert("movie not found","requested movie could not be found",200)