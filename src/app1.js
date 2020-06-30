import $ from "jquery";
console.log($);
const $button1 = $("#add1");
console.log($button1);
const $button2 = $("#subtract1");
const $button3 = $("#multiply2");
const $button4 = $("#divide2");
const $number = $("#number");
const n = localStorage.getItem("n");
$number.text(n || 100);
$button1.on("click", () => {
  let n = parseInt($number.text());
  n++;
  localStorage.setItem("n", n);
  $number.text(n);
});
$button2.on("click", () => {
  let n = parseInt($number.text());
  n--;
  localStorage.setItem("n", n);

  $number.text(n);
});
$button3.on("click", () => {
  let n = parseInt($number.text());
  n *= 2;
  localStorage.setItem("n", n);

  $number.text(n);
});
$button4.on("click", () => {
  let n = parseInt($number.text());
  n /= 2;
  localStorage.setItem("n", n);

  $number.text(n);
});