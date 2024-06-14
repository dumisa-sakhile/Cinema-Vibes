import axios from "axios";
import { $, $$, none, flex, grid, block, alert } from "./utilities.js";


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

//search Movies
