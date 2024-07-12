import "./style.css";
import "./tippy.js";
import { $, $$, none, flex, grid, block, alert } from "./utilities.js";
import "./movie.js";

// core version + navigation, pagination modules:
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';




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

const navOverview = $("#nav-overview");
const navVideos = $("#nav-videos");
const navRecommendations = $("#nav-recommendations");
const navSimilar = $("#nav-similar");

const movieDetailsOverview = $("#movie-details-overview");
const movieDetailsVideos = $("#movie-details-videos");
const movieDetailsRecommendations = $("#movie-details-recommendations");
const movieDetailsSimilar = $("#movie-details-similar");


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

  });
});

let movieDetailsPages = [movieDetailsOverview, movieDetailsVideos, movieDetailsRecommendations, movieDetailsSimilar];

function setMovieDetailsActive(whichDetailsToShow) {

  movieDetailsPages.forEach((page) => {
    none(page);
  });
  flex(whichDetailsToShow);
  
}

navOverview.addEventListener("click", () => {
  setMovieDetailsActive(movieDetailsOverview);
});

navVideos.addEventListener("click", () => {
  setMovieDetailsActive(movieDetailsVideos);
});

navRecommendations.addEventListener("click", () => {
  setMovieDetailsActive(movieDetailsRecommendations);
});   

navSimilar.addEventListener("click", () => {
  setMovieDetailsActive(movieDetailsSimilar);
});

//set default
setMovieDetailsActive(movieDetailsVideos);


// init Swiper:

const swiper = new Swiper(".swiper", {

  modules: [Navigation, Pagination],
  // Optional parameters
  direction: "horizontal",
  effect : "cards",
  loop: true,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // And if we need scrollbar
  scrollbar: {
    el: ".swiper-scrollbar",
  },
});

const swiperClass = document.querySelector(".swiper").swiper;

// Now you can use all slider methods like
swiperClass.slideNext();