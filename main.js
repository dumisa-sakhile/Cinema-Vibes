import "./style.css";
import "./tippy.js";
import { $, $$, none, flex, grid, block, alert } from "./utilities.js";
import "./movie.js";

const moviesOpen = $("#movies-open");
const movies = $("#movies");
const movieFilter = $("#movieFilter");


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
      alert("Setting Failure", "Failed to enter fullscreen", 404);
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

$("#logo").addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

$$(".go-up").forEach((el) => {
  el.classList.add("cursor-pointer");
  el.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

$("#movie-trailer-close").addEventListener("click", () => {
  console.clear();
  $("#movie-details-trailer").contentWindow.postMessage("pause", "*");
  $("#movie-details-trailer").src = $("#movie-details-trailer").src;
  $("#movie-trailer-box").className =
    "w-full h-full bg-modal fixed top-0 left-0 hidden items-center justify-center";
});

$("#movie-trailer-open").addEventListener("click", () => {
  $("#movie-trailer-box").className =
    "w-full h-full bg-popup dark:bg-modal fixed top-0 left-0 flex items-center justify-center z-20";
});

$("#movie-details-close").addEventListener("click", () => {
  $("footer").className =
    "bg-slate-100 dark:bg-black block relative w-full roboto-condensed-light";

  $("#movies").className = "w-full flex flex-col";

  $("#movie-details-page").className =
    "w-full h-full hidden flex-row items-center justify-center gap-0";

  //clear movie content to improve memory
  $("#movie-logo-title").textContent = null;
  $("#movie-details-poster").src = "/poster.png";
  $("#movie-details-title").textContent = null;
  $("#movie-details-tagline").textContent = null;
  $("#movie-details-rating-count").textContent = null;
  $("#movie-details-rating").textContent = null;
  $("#movie-details-release-date").textContent = null;
  $("#movie-details-duration").textContent = null;
  $("#movie-details-language").textContent = null;
  $("#movie-details-revenue").textContent = null;
  $("#movies-details-description").textContent = null;
  $("#movie-details-backdrop").src = "/wallpaper.jpg";
  $("#movie-details-trailer").src = null;
  $("#movie-details-genre-box").textContent = null;
  $("#movie-details-countries-box").textContent = null;
  $("#movie-details-companies-box").textContent = null;
  $("#movie-details-languages-box").textContent = null;
  $("#movie-details-recommendations-wrapper").textContent = null;
  $("#movie-details-similar-wrapper").textContent = null;
});

const movieDetailsOverview = $("#movie-details-overview");
const movieDetailsRecommendations = $("#movie-details-recommendations");
const movieDetailsSimilar = $("#movie-details-similar");

const movieDetailsOverviewWrapper = $("#movie-details-overview-wrapper");
const movieDetailsRecommendationsWrapper = $(
  "#movie-details-recommendations-wrapper"
);
const movieDetailsSimilarWrapper = $("#movie-details-similar-wrapper");

const movieDetailsWrappers = [
  movieDetailsOverviewWrapper,
  movieDetailsRecommendationsWrapper,
  movieDetailsSimilarWrapper,
];

function removeMovieListActive() {
  $$(`#movie-details-nav span`).forEach((span) => {
    span.classList.remove("filter-active");
    span.classList.add("filter-disabled");
  });
}

$$(`#movie-details-nav span`).forEach((span) => {
  span.addEventListener("click", function (ev) {
    removeMovieListActive();

    ev.currentTarget.classList.add("filter-active");

    ev.currentTarget.classList.remove("filter-disabled");

    movieDetailsWrappers.forEach((wrapper) => {
      wrapper.classList.add("hidden");
      wrapper.classList.remove("flex");
    });

    let pageToOpen = $(`#${ev.currentTarget.id}-wrapper`);
    flex(pageToOpen);
  });
});

//set default movie details wrapper to overview
movieDetailsOverview.click();
