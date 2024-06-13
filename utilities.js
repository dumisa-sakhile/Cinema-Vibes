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


