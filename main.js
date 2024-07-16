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


//Fullscreen
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
//Fullscreen


//Theme Toggle

var themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
var themeToggleLightIcon = document.getElementById("theme-toggle-light-icon");

// Change the icons inside the button based on previous settings
if (
  localStorage.getItem("color-theme") === "dark" ||
  (!("color-theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  themeToggleLightIcon.classList.remove("hidden");
} else {
  themeToggleDarkIcon.classList.remove("hidden");
}

var themeToggleBtn = document.getElementById("theme-toggle");

themeToggleBtn.addEventListener("click", function () {
  // toggle icons inside button
  themeToggleDarkIcon.classList.toggle("hidden");
  themeToggleLightIcon.classList.toggle("hidden");

  // if set via local storage previously
  if (localStorage.getItem("color-theme")) {
    if (localStorage.getItem("color-theme") === "light") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    }

    // if NOT set via local storage previously
  } else {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    }
  }
});
//Theme Toggle


$("#logo").addEventListener("click", function()  {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

$$(".go-up").forEach((el) => {
  el.classList.add("cursor-pointer");
  el.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})


$("#movie-trailer-close").addEventListener("click", () => {
  console.clear();
  $("#movie-details-trailer").contentWindow.postMessage("pause", "*");
  $("#movie-details-trailer").src = $("#movie-details-trailer").src;
  $("#movie-trailer-box").className =
    "w-full h-full bg-modal fixed top-0 left-0 hidden items-center justify-center";
});

$("#movie-trailer-open").addEventListener("click",()=>{
  $("#movie-trailer-box").className =
    "w-full h-full bg-modal fixed top-0 left-0 flex items-center justify-center";
})

$("#movie-details-close").addEventListener("click", () => {

$("footer").className="bg-inherit dark:bg-gray-900 block relative w-full roboto-condensed-light"

$("#movies").className = "w-full flex flex-col";

  $("#movie-details-page").className =
    "w-full h-full hidden flex-row items-center justify-center gap-0";
});
