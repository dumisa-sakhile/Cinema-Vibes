import axios from "axios";
import { $, $$, none, flex, grid, block, alert, createMovieCard } from "./utilities.js";


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
    const response = await tmdbApi.get(`search/movie?q`, {
      params: {
        query: `${$("#movie-search").value.trim()}`,
      },
    });


    if (!response.data.results.length){
      alert("movie not found", "requested movie could not be found", 404);
    }else{

      $("#movie-search-box").className = "w-full min-h-[700px] flex flex-wrap items-center justify-center gap-4 py-10 px-10 space-y-4";

      $("#movie-display-box").className =
        "w-full min-h-[700px] hidden flex-wrap items-center justify-center gap-4 py-10 px-10 space-y-4";

      $("#movie-search-box").innerText="";

      $("#movie-clear-search").className =
        "fixed bottom-10 w-full min-h-20 flex flex-col items-center justify-center gap-6 p-4 z-10 rounded pointer-events-none";

      $("#movie-pagination").className =
        "fixed bottom-10 w-full min-h-20 hidden flex-col items-center justify-center gap-6 p-4 z-10 rounded pointer-events-none";
      
      response.data.results.map((movie) => {
        createMovieCard(movie, $("#movie-search-box"));
      })
      
    console.log(response.data);

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
  
  $("#movie-search-box").className =
    "w-full min-h-[700px] hidden flex-wrap items-center justify-center gap-4 py-10 px-10 space-y-4";

  $("#movie-display-box").className =
    "w-full min-h-[700px] flex flex-wrap items-center justify-center gap-4 py-10 px-10 space-y-4";

  $("#movie-clear-search").className =
    "fixed bottom-10 w-full min-h-20 hidden flex-col items-center justify-center gap-6 p-4 z-10 rounded pointer-events-none";

  $("#movie-pagination").className =
    "fixed bottom-10 w-full min-h-20 flex flex-col items-center justify-center gap-6 p-4 z-10 rounded pointer-events-none";
      
    $("#movie-search").value = null;

});

//search Movies
