import './style.css'
import { $, $$, none, flex, grid, block } from './utilities.js'

const moviesOpen = $("#movies-open");
const tvOpen = $("#tv-open");
const movies = $("#movies");
const tv = $("#tv");



tvOpen.addEventListener("click", () => {
  none(movies);
  flex(tv);
  tvOpen.classList="btn-active";
  moviesOpen.classList="btn-disabled";
});

moviesOpen.addEventListener("click", () => {
  none(tv);
  flex(movies);
  moviesOpen.classList = "btn-active";
  tvOpen.classList = "btn-disabled";
});