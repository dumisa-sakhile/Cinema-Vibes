export function $(selector) {
  return document.querySelector(selector);
}
export function $$(selector) {
  return document.querySelectorAll(selector);
}
export function none(selector) {
  selector.classList.add("hidden");
}
export function flex(selector) {
  selector.classList.remove("hidden");
  selector.classList.add("flex");
}
export function grid(selector) {
  selector.classList.remove("hidden");
  selector.classList.grid("flex");
}
export function block(selector) {
  selector.classList.remove("hidden");
  selector.classList.block("flex");
}
export function alert(alertTitle,alertMessage,alertType){
flex($("#alert"));
$("#alert-title").textContent = alertTitle;
$("#alert-message").textContent = alertMessage;

if (alertType == 404) {
  $("#alert").classList.remove("bg-green-400");
  $("#alert").classList.add("bg-red-400");
  $("#alert").classList.remove("ring-green-600");
  $("#alert").classList.add("ring-red-600");
  $("#alert").classList.remove("text-green-900");
  $("#alert").classList.add("text-red-900");

  $("#close-alert").style.fill = "maroon";


} else if (alertType == 200) {
  $("#alert").classList.remove("bg-red-400");
  $("#alert").classList.add("bg-green-400");
  
  $("#alert").classList.add("ring-green-600");
  $("#alert").classList.remove("ring-red-600");
  $("#alert").classList.add("text-green-900");
  $("#alert").classList.remove("text-red-900");

  $("#close-alert").style.fill="green";
}

}
export function createMovieCard(movie, container) {
  const imgBaseUrl = "https://image.tmdb.org/t/p/original";
  const { title, poster_path, vote_average, id, release_date } = movie;

  const article = document.createElement("article");
  article.id = id;
  article.className =
    "movie-container w-[180px] h-[270px] shadow-lg rounded-md flex flex-col items-center justify-start relative bg-gray-800 text-slate-300 border-2 border-green-600";

  const img = document.createElement("img");
  img.src = poster_path ? `${imgBaseUrl}${poster_path}` : "/poster.png";
  img.className = "rounded-sm overflow-hidden";
  img.setAttribute("alt", title);
  article.appendChild(img);

  const rating = document.createElement("div");
  rating.className =
    "movie-rating bg-green-500  w-[50px] h-[50px] absolute  -top-5  rounded-full flex items-center justify-center roboto-condensed-light text-slate-900 text-md ring-[1px] ring-green-600 shadow";
  rating.textContent = vote_average ?? 0;
  article.appendChild(rating);

  const hover = document.createElement("div");
  hover.className =
    "movie-hover bg-modal w-full h-full absolute top-0 left-0 rounded-sm opacity-0 hover:opacity-100 cursor-pointer flex items-center justify-center flex-col gap-4";
  article.appendChild(hover);

  const h1 = document.createElement("h1");
  h1.className = "movie-title text-center text-sm roboto-condensed-medium";
  h1.textContent = title;
  hover.appendChild(h1);
  const p = document.createElement("p");
  p.className = "movie-overview text-center text-xs roboto-condensed-light";
  p.textContent = release_date ?? new Date(release_date).toLocaleDateString();
  hover.appendChild(p);

  container.appendChild(article);
}

export function showSearchBox(isSearch){

  if(isSearch){
    $("#movie-search-box").className =
      "w-full min-h-[700px] flex flex-wrap items-center justify-center gap-4 py-10 px-10 space-y-4";

    $("#movie-display-box").className =
      "w-full min-h-[700px] hidden flex-wrap items-center justify-center gap-4 py-10 px-10 space-y-4";

    $("#movie-search-box").innerText = "";

    $("#movie-clear-search").className =
      "fixed bottom-10 w-full min-h-20 flex flex-col items-center justify-center gap-6 p-4 z-10 rounded pointer-events-none";

    $("#movie-pagination").className =
      "fixed bottom-10 w-full min-h-20 hidden flex-col items-center justify-center gap-6 p-4 z-10 rounded pointer-events-none";
  }else{
    $("#movie-search-box").className =
      "w-full min-h-[700px] hidden flex-wrap items-center justify-center gap-4 py-10 px-10 space-y-4";

    $("#movie-display-box").className =
      "w-full min-h-[700px] flex flex-wrap items-center justify-center gap-4 py-10 px-10 space-y-4";

    $("#movie-clear-search").className =
      "fixed bottom-10 w-full min-h-20 hidden flex-col items-center justify-center gap-6 p-4 z-10 rounded pointer-events-none";

    $("#movie-pagination").className =
      "fixed bottom-10 w-full min-h-20 flex flex-col items-center justify-center gap-6 p-4 z-10 rounded pointer-events-none";

    $("#movie-search").value = null;
  }

}