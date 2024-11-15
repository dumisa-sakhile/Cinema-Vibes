import axios from "axios";
import { $, $$, none, flex, grid, block, alert, createMovieCard, showSearchBox, updatePaginationTippy} from "./utilities.js";



const tmdbApi = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});

// ! from the .env file
const token = import.meta.env.TMDB_API_KEY;

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

      window.scrollTo({ top: 0, behavior: "smooth" });

      $("#movie-search-title").textContent = $("#movie-search").value;
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

//!handle article click using delegation
   $("#movie-search-box").addEventListener("click", function (ev) {

if(ev.target.parentElement.closest("article")){

   fetchMovieSources(ev.target.closest("article").id);
   $("footer").className =
     "bg-slate-100 dark:bg-[#151515] hidden relative w-full roboto-condensed-light";

   $("#movies").className = "w-full hidden flex-col";

   $("#movie-details-page").className =
     "w-full h-full flex flex-row items-center justify-center gap-0";

   $("#movie-details-overview").click();

}
    
   });
//handle article click using delegation

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

//used by the fetchMovieSources function to set a global argument
let globalSpecialId;
let globalSpecialType;

//Pagination Functionality
let moviePageNumber;
let movieCurrentPage = $("#movie-current-page");
let movieTotalPages = $("#movie-total-pages");
let movieCurrentPageTwo = $("#movie-current-page-2");

function setMoviePages(total_pages){
  movieCurrentPage.textContent = moviePageNumber;
  movieTotalPages.textContent = total_pages.toLocaleString();
  movieCurrentPageTwo.textContent = moviePageNumber;
}

function hideShowMovieButtons(total_pages) {
  moviePageNumber <= 1
    ? (moviePreviousPage.className =
        "hidden py-2 px-6 bg-[#ff3d00] rounded-lg text-sm capitalize text-slate-800 shadow-lg roboto-condensed-regular hover:bg-red-700")
    : (moviePreviousPage.className =
        "block py-2 px-6 bg-[#ff3d00] rounded-lg text-sm capitalize text-slate-800 shadow-lg roboto-condensed-regular hover:bg-red-700");

  moviePageNumber < total_pages
    ? (movieNextPage.className =
        "block py-2 px-8 bg-[#a7fe53] hover:bg-[#a7fe77] ring-[1px] ring-[#a9fe03] rounded-lg text-sm capitalize text-green-950 shadow-lg roboto-condensed-regular")
    : (movieNextPage.className =
        "hidden py-2 px-8 bg-[#a7fe53] hover:bg-[#a7fe77] ring-[1px] ring-[#a9fe03] rounded-lg text-sm capitalize text-green-950 shadow-lg roboto-condensed-regular");
}


//determines whether the pagination is being used for movie list
let paginationStatus = "list";
//paginationStatus = "list" or "genre" or "details"

let moviePreviousPage = $("#movie-previous-page");
let movieNextPage = $("#movie-next-page");

moviePreviousPage.addEventListener("click", function(){
window.scrollTo({ top: 0, behavior: "smooth" });
  moviePageNumber--;
  switch (paginationStatus) {
    case "list":
      fetchMovies();
      break;

    case "genre":
      fetchMoviesGenre();
      break;

    case "special":
      fetchMoviesSpecial(globalSpecialType,globalSpecialId);
      break;
  }

});

movieNextPage.addEventListener("click", () => {
window.scrollTo({ top: 0, behavior: "smooth" });
  moviePageNumber++;
  switch (paginationStatus) {
    case "list":
      fetchMovies();
      break;

    case "genre":
      fetchMoviesGenre();
      break;

    case "special":
      fetchMoviesSpecial(globalSpecialType,globalSpecialId);
      break;
  }

  
});
//Pagination Functionality END

let movieGenresQuery = new Set();
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

 $(`#movie-list-box`).addEventListener("click", function (ev) {
   if (ev.target.matches("span")) {
     removeMovieListActive();

     ev.target.classList.add("filter-active");
     alert(
       "Movie List Filter",
       `Movie list filtered according to ${ev.target.textContent} movies`,
       200
     );
     ev.target.classList.remove("filter-disabled");

     movieListType = ev.target.id;
     moviePageNumber = 1;

     //Reset genre filters
     movieGenresQuery.clear();

     fetchMovies();
   }
 });

$(`#movie-list-box #popular`).click();
//commented out for now



async function fetchMovies() {

  try {

  paginationStatus = "list";

    const response = await tmdbApi.get(`movie/${movieListType}?`, {
      params: {
        page: moviePageNumber,
      },
    });

    if (!response.data.results.length) {
      alert("movie not found", "requested movie could not be found", 404);
    } else {

      window.scrollTo({ top: 0, behavior: "smooth" });
      $("#movie-display-box").textContent = "";

      showSearchBox(false);
      hideShowMovieButtons(response.data.total_pages);
      setMoviePages(response.data.total_pages);

      //Map movies
      response.data.results.map((movie) => {
        createMovieCard(movie, $("#movie-display-box"));
      });

    
      //Reset genre filters
      $$(`#movie-genre-box span`).forEach((span) => {
        span.className = "filter-disabled";
      });

      //update pagination tippy
      updatePaginationTippy();

     // console.log(response.data);
    }
  } catch (error) {
    console.error(error);
  }
}
//Fetch Movie Summary END


//handle article click using delegation
 $("#movie-display-box").addEventListener("click", function (ev) {
   if (ev.target.parentElement.closest("article")) {
     fetchMovieSources(ev.target.closest("article").id);
     $("footer").className =
       "bg-slate-100 dark:bg-[#151515] hidden relative w-full roboto-condensed-light";

     $("#movies").className = "w-full hidden flex-col";

     $("#movie-details-page").className =
       "w-full h-full flex flex-row items-center justify-center gap-0";

     $("#movie-details-overview").click();
   }
 });
 //handle article click using delegation

// Fetch Movie Genres
const movieGenre = $("#movie-genre-filter");
const genreFilterBox = $("#movie-genre-box");
let movieFetchGenreQuery;
let movieActiveGenre = new Set();

async function fetchMoviesGenre() {
  try {

    paginationStatus = "genre";

    movieFetchGenreQuery = "";

    Array.from(movieGenresQuery).forEach((genreQuery) => {
      movieFetchGenreQuery = movieFetchGenreQuery.concat(genreQuery, ",");
    });

    let with_genres_query = movieFetchGenreQuery;

    //console.log("final query is: ", with_genres_query);
    //console.log("final set is: ", movieGenresQuery);

    const response = await tmdbApi.get(`discover/movie?`, {
      params: {
        include_adult: false,
        include_video: false,
        language: "en-US",
        page: moviePageNumber,
        sort_by: "popularity.desc",
        with_genres: with_genres_query,
      },
    });

    if (!response.data.results.length) {
      alert("movie not found", "requested movie could not be found", 404);
    } else {

window.scrollTo({ top: 0, behavior: "smooth" });

$("#movie-display-box").textContent = "";

      showSearchBox(false);
      //console.log(`invoked`, response.data.results);

      hideShowMovieButtons(response.data.total_pages);
      setMoviePages(response.data.total_pages);

      //update pagination tippy
      updatePaginationTippy();

      //Map movies
      response.data.results.map((movie) => {
        createMovieCard(movie, $("#movie-display-box"));
      });

      //Reset genre filters
      $$(`#movie-list-box span`).forEach((span) => {
        span.className = "filter-disabled";
      });

      // console.log(response.data);
    }
  } catch (error) {
    console.error(error);
  }
}

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

 $("#movie-genre-box").addEventListener("click", function (ev) {
   if (ev.target.matches("span")) {
     ev.target.classList.toggle("filter-active");
     ev.target.classList.toggle("filter-disabled");
     //console.log(ev.target.dataset.query);
     ev.target.classList.contains("filter-active")
       ? movieGenresQuery.add(ev.target.dataset.query)
       : movieGenresQuery.delete(ev.target.dataset.query);
     //console.log(movieGenresQuery);

     //for alert purposes
     ev.target.classList.contains("filter-active")
       ? movieActiveGenre.add(ev.target.textContent)
       : movieActiveGenre.delete(ev.target.textContent);
   }
 });

$("#movie-genre-apply").addEventListener("click", () => {
  //for alert purposes
  let movieActiveGenreArray = Array.from(movieActiveGenre);
  alert(
    "Genre Filter",
    `Movie genre filtered according to ${movieActiveGenreArray.join(", ")} movies`,
    200
  );
  //for alert purposes End

  moviePageNumber = 1;

  movieGenresQuery.size
    ? fetchMoviesGenre()
    : alert("No genre selected", "Please select a genre", 404);
});
// Fetch Movie Genres END

//Movie Description
async function fetchMovieSources(movieId) {
  try {
    const [movieDetails, movieVideos, recommendedMovies, similarMovies] =
      await Promise.all([
        tmdbApi.get(`movie/${movieId}?`, {
          params: {
            language: "en-US",
          },
        }),
        tmdbApi.get(`movie/${movieId}/videos?`, {
          params: {
            language: "en-US",
          },
        }),
        tmdbApi.get(`movie/${movieId}/recommendations?`, {
          params: {
            language: "en-US",
            page: 1,
          },
        }),
        tmdbApi.get(`movie/${movieId}/similar?`, {
          params: {
            language: "en-US",
            page: 1,
          },
        }),
      ]);

    const movieDetailsData = movieDetails.data;
    const movieVideosData = movieVideos.data.results;
    const recommendedMoviesData = recommendedMovies.data.results;
    const similarMoviesData = similarMovies.data.results;

    //createMovieCard
    // Handle the data

    $("#movie-logo-title").textContent = movieDetailsData.title;
    $("#movie-details-poster").src = movieDetailsData.poster_path
      ? `https://image.tmdb.org/t/p/w500${movieDetailsData.poster_path}`
      : "/poster.png";
    $("#movie-details-poster").setAttribute("alt", movieDetailsData.title);
    $("#movie-details-title").textContent = movieDetailsData.title;
    $("#movie-details-tagline").textContent = movieDetailsData.tagline;
    $(
      "#movie-details-rating-count"
    ).textContent = `(${movieDetailsData.vote_count})`;
    $("#movie-details-rating").textContent = movieDetailsData.vote_average;
    $("#movie-details-release-date").textContent =
      new Date(movieDetailsData.release_date).toLocaleDateString() || "";
    
      const hours = Math.floor(movieDetailsData.runtime / 60);
      const minutes = movieDetailsData.runtime % 60;

      if (hours > 0) {
        $("#movie-details-duration").textContent = `${hours}h ${minutes}m`;
      } else {
        $("#movie-details-duration").textContent = `${minutes}m`;
      }



    $("#movie-details-language").textContent =
      movieDetailsData.original_language.toUpperCase();
    $("#movie-details-revenue").textContent =
      movieDetailsData.revenue.toLocaleString();
    $("#movies-details-description").textContent = movieDetailsData.overview;
    $("#movie-details-backdrop").src = movieDetailsData.backdrop_path
      ? `https://image.tmdb.org/t/p/w500${movieDetailsData.backdrop_path}`
      : "/wallpaper.jpg";


    //movie trailer

    for (const video of movieVideosData) {
      if (video.type === "Clip" || video.type === "Trailer") {
        $(
          "#movie-details-trailer"
        ).src = `https://www.youtube.com/embed/${video.key}`;
        break;
      } else {
        $(
          "#movie-details-trailer"
        ).src = `https://www.youtube-nocookie.com/embed/Y-x0efG1seA`;
      }
    }


    //movie trailer

    //Genre Filter
    $("#movie-details-genre-box").textContent = "";
    movieDetailsData.genres.forEach((genre) => {
      const span = document.createElement("span");
      span.className = "hover:roboto-condensed-semibold text-[#a7fe53]";
      span.textContent = genre.name;
      span.id = genre.id;
      $("#movie-details-genre-box").appendChild(span);
    });

      $("#movie-details-genre-box").addEventListener("click", function (ev) {
        if (ev.target.matches("span")) {
          moviePageNumber = parseInt(1);
          removeMovieListActive();
          paginationStatus = "special";
          globalSpecialType = "with_genres";
          globalSpecialId = ev.target.id;
          fetchMoviesSpecial("with_genres", ev.target.id);
          alert(
            "Genre Filter",
            `Movies filtered according to the ${ev.target.textContent} genre.`,
            200
          );
        }
      });

    //Genre Filter

    //Country Filter
    $("#movie-details-countries-box").textContent = "";
    movieDetailsData.production_countries.forEach((country) => {
      const span = document.createElement("span");
      span.className = "hover:roboto-condensed-semibold text-[#a7fe53]";
      span.textContent = country.name;
      span.id = country.iso_3166_1;
      $("#movie-details-countries-box").appendChild(span);
    });
    
   $("#movie-details-countries-box").addEventListener("click", function (ev) {
     if (ev.target.matches("span")) {
       moviePageNumber = parseInt(1);
       removeMovieListActive();
       globalSpecialType = "with_origin_country";
       globalSpecialId = ev.target.id;
       paginationStatus = "special";
       fetchMoviesSpecial("with_origin_country", ev.target.id);
       alert(
         "Countries Filter",
         `Movies filtered according to the country: ${ev.target.textContent}.`,
         200
       );
     }
   });
     
    //Country Filter


    //Company Filter
    $("#movie-details-companies-box").textContent = "";
    movieDetailsData.production_companies.forEach((company) => {
      const span = document.createElement("span");
      span.className = "hover:roboto-condensed-semibold text-[#a7fe53]";
      span.textContent = company.name;
      span.id = company.id;
      $("#movie-details-companies-box").appendChild(span);
    });

    $("#movie-details-companies-box").addEventListener("click", function (ev) {
      if (ev.target.matches("span")) {
        moviePageNumber = parseInt(1);
        removeMovieListActive();
        paginationStatus = "special";
        globalSpecialType = "with_companies";
        globalSpecialId = ev.target.id;
        fetchMoviesSpecial("with_companies", ev.target.id);
        alert(
          "Production Companies Filter",
          `Movies filtered according to the Production Company: ${ev.target.textContent}.`,
          200
        );
      }
    });

    //Company Filter

    //Language Filter
    $("#movie-details-languages-box").textContent = "";
    movieDetailsData.spoken_languages.forEach((language) => {
      const span = document.createElement("span");
      span.className = "hover:roboto-condensed-semibold text-[#a7fe53]";
      span.textContent = language.english_name;
      span.id = language.iso_639_1;
      $("#movie-details-languages-box").appendChild(span);
    });

     
    $("#movie-details-languages-box").addEventListener("click", function (ev) {
      if (ev.target.matches("span")) {
        moviePageNumber = parseInt(1);
        removeMovieListActive();
        paginationStatus = "special";
        globalSpecialType = "with_original_language";
        globalSpecialId = ev.target.id;
        fetchMoviesSpecial("with_original_language", ev.target.id);
        alert(
          "Languages Filter",
          `Movies filtered according to the language: ${ev.target.textContent}.`,
          200
        );
      }
    });
    //Language Filter

    // recommended movies
    $("#movie-details-recommendations-wrapper").textContent = "";
    recommendedMoviesData.forEach((movie) => {
      createMovieCard(movie, $("#movie-details-recommendations-wrapper"));
    });


    //similar movies
    $("#movie-details-similar-wrapper").textContent = "";
    similarMoviesData.forEach((movie) => {
      createMovieCard(movie, $("#movie-details-similar-wrapper"));
    });
  
    // console.log("details", movieDetailsData);
    // console.log("videos", movieVideosData);
    // console.log("recommended",recommendedMoviesData);
    // console.log("similar",similarMoviesData);
  } catch (error) {
    console.error(error);
  }
}

//Movie Description

//handle article click using delegation on recommendations
 $("#movie-details-recommendations-wrapper").addEventListener(
   "click",
   function (ev) {
     if (ev.target.parentElement.closest("article")) {
       fetchMovieSources(ev.target.closest("article").id);
       $("footer").className =
         "bg-slate-100 dark:bg-[#151515] hidden relative w-full roboto-condensed-light";

       $("#movies").className = "w-full hidden flex-col";

       $("#movie-details-page").className =
         "w-full h-full flex flex-row items-center justify-center gap-0";

       $("#movie-details-overview").click();
     }
   }
 );
 //handle article click using delegation on recommendations

 //handle article click using delegation on similar
 $("#movie-details-similar-wrapper").addEventListener("click", function (ev) {
   if (ev.target.parentElement.closest("article")) {
     fetchMovieSources(ev.target.closest("article").id);
     $("footer").className =
       "bg-slate-100 dark:bg-[#151515] hidden relative w-full roboto-condensed-light";

     $("#movies").className = "w-full hidden flex-col";

     $("#movie-details-page").className =
       "w-full h-full flex flex-row items-center justify-center gap-0";

     $("#movie-details-overview").click();
   }
 });
 //handle article click using delegation on similar

async function fetchMoviesSpecial(with_type, with_type_query) {
  try {

    paginationStatus = "special";

    //back to main page
    $("#movie-details-close").click();

    const response = await tmdbApi.get(`discover/movie?`, {
      params: {
        include_adult: false,
        include_video: false,
        language: "en-US",
        page: parseInt(moviePageNumber),
        sort_by: "popularity.desc",
        [with_type]: with_type_query,
      },
    });

    if (!response.data.results.length) {
      alert("movie not found", "requested movie could not be found", 404);
    } else {

window.scrollTo({ top: 0, behavior: "smooth" });

$("#movie-display-box").textContent = "";

      showSearchBox(false);
      hideShowMovieButtons(response.data.total_pages);
      setMoviePages(response.data.total_pages);

      //update pagination tippy
      updatePaginationTippy();

      //Map movies
      response.data.results.map((movie) => {
        createMovieCard(movie, $("#movie-display-box"));
      });


      //Reset list filters
      $$(`#movie-list-box span`).forEach((span) => {
        span.className = "filter-disabled";
      });

      //Reset genre filters
      $$(`#movie-genre-box span`).forEach((span) => {
        span.className = "filter-disabled";
      });

      // console.log(response.data);
    }
  } catch (error) {
    console.error(error);
  }
}

