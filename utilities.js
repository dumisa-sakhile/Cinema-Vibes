import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";

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
  selector.classList.add("block");
}
export function alert(alertTitle, alertMessage, alertType) {
  flex($("#alert"));
  $("#alert-title").textContent = alertTitle;
  $("#alert-message").textContent = alertMessage;

  if (alertType == 404) {
    $("#alert").classList.remove("bg-[#a7fe53]");
    $("#alert").classList.add("bg-red-300");
    $("#alert").classList.remove("ring-green-500");
    $("#alert").classList.add("ring-red-500");
    $("#alert").classList.remove("text-green-950");
    $("#alert").classList.add("text-red-950");

    $("#close-alert").style.fill = "maroon";
  } else if (alertType == 200) {
    $("#alert").classList.remove("bg-red-300");
    $("#alert").classList.add("bg-[#a7fe53]");

    $("#alert").classList.add("ring-green-500");
    $("#alert").classList.remove("ring-red-500");
    $("#alert").classList.add("text-green-950");
    $("#alert").classList.remove("text-red-950");

    $("#close-alert").style.fill = "green";
  }

  setTimeout(() => {
    $("#close-alert").click();
  }, 10000);
}
export function createMovieCard(movie, container) {
  const imgBaseUrl = "https://image.tmdb.org/t/p/original";
  const { title, poster_path, vote_average, id, release_date } = movie;

  const article = document.createElement("article");
  article.id = id;
  article.className =
    "movie-container w-[180px] h-[360px] rounded-md flex flex-col items-center justify-start relative bg-inherit dark:text-slate-300 space-y-2 ring-[1px] ring-slate-300 dark:ring-gray-800 shadow-sm";

  const img = document.createElement("img");
  img.src = poster_path ? `${imgBaseUrl}${poster_path}` : "/poster.png";
  img.className = "rounded-t-md overflow-hidden";
  img.setAttribute("alt", title);
  article.appendChild(img);

  const hover = document.createElement("div");
  hover.className =
    "movie-hover bg-popup dark:bg-modal  w-full h-full absolute -top-2 left-0 rounded-md opacity-0 hover:opacity-100 cursor-pointer flex items-center justify-center flex-col ring-2 dark:ring-[1px] ring-[#a9fe03]";
  article.appendChild(hover);

  const rating = document.createElement("div");
  rating.className =
    "movie-rating bg-[#a9fe03]  w-[50px] h-[50px]  rounded-full flex items-center justify-center roboto-condensed-light text-slate-900 text-md ring-[1px] ring-green-600 shadow";
  rating.textContent = vote_average ?? 0;
  hover.appendChild(rating);

  const h1 = document.createElement("h1");
  h1.className = "movie-title text-center text-sm roboto-condensed-medium";
  h1.textContent = title;
  article.appendChild(h1);
  const p = document.createElement("p");
  p.className = "movie-overview text-center text-xs roboto-condensed-light";
  p.textContent = release_date
    ? new Date(release_date).toLocaleDateString()
    : "";
  article.appendChild(p);

  container.appendChild(article);
}

export function showSearchBox(isSearch) {
  if (isSearch) {

    $("#movie-filters-group").className =
      "bg-slate-50 dark:bg-black dark:text-slate-300 ring-[1px] ring-slate-200 dark:ring-gray-900 focus:ring-2  w-[320px] min-h-[100px] absolute top-[150px] left-10 rounded-md shadow-sm py-2 hidden flex-col items-center  roboto-condensed-light z-[12]";

    $("#movie-search-title-box").className =
      "p-2 min-w-[320px] w-full flex items-center justify-center flex-wrap gap-2 mt-2 roboto-condensed-bold";

      $("#movie-list-box").className =
        "p-2 min-w-[320px] w-full hidden items-center justify-center flex-wrap gap-2 mt-2";

    $("#movie-search-box").className =
      "w-full min-h-[700px] flex flex-wrap items-center justify-center gap-4 py-10 px-10 space-y-4";

    $("#movie-display-box").className =
      "w-full min-h-[700px] hidden flex-wrap items-center justify-center gap-4 py-10 px-10 space-y-4";

    $("#movie-search-box").innerText = "";

    $("#movie-clear-search").className =
      "fixed bottom-10 w-full min-h-20 flex flex-col items-center justify-center gap-6 p-4 z-10 rounded pointer-events-none";

    $("#movie-pagination").className =
      "fixed bottom-10 w-full min-h-20 hidden flex-col items-center justify-center gap-6 p-4 z-10 rounded pointer-events-none";

    //hide filters when search box is shown
    $("#movie-filters-group-close").click();
  } else {

    $("#movie-search-title-box").className =
      "p-2 min-w-[320px] w-full hidden items-center justify-center flex-wrap gap-2 mt-2 roboto-condensed-bold";

    $("#movie-list-box").className =
      "p-2 min-w-[320px] w-full flex items-center justify-center flex-wrap gap-2 mt-2";

    $("#movie-search-box").className =
      "w-full min-h-[700px] hidden flex-wrap items-center justify-center gap-4 py-10 px-10 space-y-4";

    $("#movie-display-box").className =
      "w-full min-h-[700px] flex flex-wrap items-center justify-center gap-4 py-10 px-10 space-y-4";

    $("#movie-clear-search").className =
      "fixed bottom-10 w-full min-h-20 hidden flex-col items-center justify-center gap-6 p-4 z-10 rounded pointer-events-none";

    $("#movie-search-box").innerText = "";

    $("#movie-pagination").className =
      "fixed bottom-10 w-full min-h-20 flex flex-col items-center justify-center gap-6 p-4 z-10 rounded pointer-events-none";

    $("#movie-search").value = null;
  }
}

export function updatePaginationTippy() {
  tippy("#movie-previous-page", {
    content: `Page ${
      parseInt(document.querySelector("#movie-current-page").textContent) - 1
    }`,
  });

  tippy("#movie-next-page", {
    content: `Page ${
      parseInt(document.querySelector("#movie-current-page").textContent) + 1
    }`,
  });
}
