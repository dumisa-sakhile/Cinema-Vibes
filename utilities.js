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
