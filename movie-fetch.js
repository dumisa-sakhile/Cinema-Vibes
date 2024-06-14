import axios from "axios";
import { $, $$, none, flex, grid, block, alert, createMovieCard, showSearchBox } from "./utilities.js";


const tmdbApi = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});

const token = process.env.TMDB_API_KEY;

tmdbApi.interceptors.request.use((config) => {
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

//search Movies
async function searchMovies() {
  try {
    const response = await tmdbApi.get(`search/movie?`, {
      params: {
        query: `${$("#movie-search").value.trim()}`,
      },
    });


    if (!response.data.results.length){
      alert("movie not found", "requested movie could not be found", 404);
    }else{

        showSearchBox(true);

      response.data.results.map((movie) => {
        createMovieCard(movie, $("#movie-search-box"));
      })
      
    //console.log(response.data);

    }

  } catch (error) {
    console.error(error);
  }
}
$("#movie-search").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    !this.value.trim()
      ? alert("Empty search", "please enter a movie", 404)
      : searchMovies();
  }
});
$("#movie-clear-search").addEventListener("click", () => { 
  showSearchBox(false);
});
//search Movies END


//Fetch Movie Summary

let movieListType;
let moviePageNumber;
const movieListBox = $("#movie-list-box");

const movieLists = [
  {
    name: "Now Playing",
    id: "now_playing",
  },
  { name: "Popular", id: "popular" },
  {
    name: "Top Rated",
    id: "top_rated",
  },
  { name: "Upcoming", id: "upcoming" },
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

    movieListType = ev.currentTarget.id;
    moviePageNumber = 2;
    fetchMovies();
  });
});


async function fetchMovies() {
  try {
    const response = await tmdbApi.get(`movie/${movieListType}?`, {
      params: {
        page: moviePageNumber,
      },
    });

    if (!response.data.results.length) {
      alert("movie not found", "requested movie could not be found", 404);
    } else {

      $("#movie-display-box").innerText = "";

      showSearchBox(false);

      response.data.results.map((movie) => {
        createMovieCard(movie, $("#movie-display-box"));
      });

      console.log(response.data);
    }
  } catch (error) {
    console.error(error);
  }
}
//Fetch Movie Summary
