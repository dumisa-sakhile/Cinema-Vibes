import { $, $$, none, flex, grid, block, alert } from "./utilities.js";
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

const movieLists = [
  {
    name: "Now Playing",
    id: "https://api.themoviedb.org/3/movie/now_playing?page=",
  },
  { name: "Popular", id: "https://api.themoviedb.org/3/movie/popular?page=" },
  {
    name: "Top Rated",
    id: "https://api.themoviedb.org/3/movie/top_rated?page=",
  },
  { name: "Upcoming", id: "https://api.themoviedb.org/3/movie/upcoming?page=" },
];

movieLists.map((list) => {
  const span = document.createElement("span");
  span.id = list.id;
  span.textContent = list.name;
  span.classList = "filter-disabled";
  movieListBox.appendChild(span);
});

function removeMovieListActive() {
  $$(`#movie-list-box span`).forEach((span) => {
    span.classList.remove("filter-active");
    span.classList.add("filter-disabled");
  });
}

$$(`#movie-list-box span`).forEach((span) => {
  span.addEventListener("click", function (ev) {
    removeMovieListActive();

    ev.currentTarget.classList.add("filter-active");
    ev.currentTarget.classList.remove("filter-disabled");
  });
});

for (let i = 0; i < 20; i++) {
  $("#movie-display-box").innerHTML += `<article class="movie-container w-[180px] h-[270px] shadow-lg rounded-md flex flex-col items-center justify-start relative bg-gray-800 text-slate-300 border-2 border-green-600">

 <img src="https://media.themoviedb.org/t/p/w220_and_h330_face/gKkl37BQuKTanygYQG1pyYgLVgf.jpg" alt="" class="rounded-sm">

 <div class="movie-rating bg-green-500  w-[50px] h-[50px] absolute  -top-5  rounded-full flex items-center justify-center roboto-condensed-light text-slate-900 text-md ring-[1px] ring-green-600 shadow z-[1]">7.5</div>


 <div class="movie-hover bg-modal w-full h-full absolute top-0 left-0 rounded-sm opacity-0 hover:opacity-100 cursor-pointer flex items-center justify-center flex-col gap-4">
<h1 class="movie-display-title text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-lime-600 roboto-condensed-black capitalize">bad boys</h1>
<p class="movie-display-date roboto-condensed-light text-sm">14 May 2024</p>
 </div>

</article>`;

$(
  "#movie-search-box"
).innerHTML += `<article class="movie-container w-[180px] h-[270px] shadow-lg rounded-md flex flex-col items-center justify-start relative bg-gray-800 text-slate-300 border-2 border-green-600">

 <img src="https://media.themoviedb.org/t/p/w220_and_h330_face/gKkl37BQuKTanygYQG1pyYgLVgf.jpg" alt="" class="rounded-sm">

 <div class="movie-rating bg-green-500  w-[50px] h-[50px] absolute  -top-5  rounded-full flex items-center justify-center roboto-condensed-light text-slate-900 text-md ring-[1px] ring-green-600 shadow z-[1]">7.5</div>


 <div class="movie-hover bg-modal w-full h-full absolute top-0 left-0 rounded-sm opacity-0 hover:opacity-100 cursor-pointer flex items-center justify-center flex-col gap-4">
<h1 class="movie-display-title text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-lime-600 roboto-condensed-black capitalize">bad boys</h1>
<p class="movie-display-date roboto-condensed-light text-sm">14 May 2024</p>
 </div>

</article>`;

}