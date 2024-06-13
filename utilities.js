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
  $("#alert").classList.remove("bg-indigo-500");
  $("#alert").classList.add("bg-red-500");
} else if (alertType == 200) {
  $("#alert").classList.remove("bg-red-500");
  $("#alert").classList.add("bg-indigo-500");
}

}