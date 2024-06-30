import "./style.css";
import "./tippy.js";
import { $, $$, none, flex, grid, block, alert } from "./utilities.js";
import "./movie.js";

const moviesOpen = $("#movies-open");
const tvOpen = $("#tv-open");
const movies = $("#movies");
const tv = $("#tv");
const movieFilter = $("#movieFilter");

tvOpen.addEventListener("click", () => {
  //none(movies);
 // flex(tv);

  alert("Under Construction", "TV Shows page is under construction and coming soon!", 200);
});

moviesOpen.addEventListener("click", () => {
  none(tv);
  flex(movies);

  alert("Movies", "Welcome to the Movies page!", 200);
});

$("#close-alert").addEventListener("click", () => {
  none($("#alert"));
});



//Date and CopyRight
let date = new Date();
$(".year").textContent = date.getFullYear();
//Date and CopyRight

const fullScreen = $("#fullscreen");

fullScreen.addEventListener("click", toggleFullscreen);

fullScreen.textContent = "Enter Fullscreen Mode";

function toggleFullscreen() {
  if (document.fullscreenElement) {
    // If there's an element in fullscreen, exit fullscreen
    document.exitFullscreen();
    this.textContent = "Enter Fullscreen Mode";
  } else {
    // If not in fullscreen, request fullscreen on the document
    this.textContent = "Exit Fullscreen Mode";
    document.documentElement.requestFullscreen().catch((err) => {
     alert("Setting Failure","Failed to enter fullscreen", 404);
    });
  }
}
