import $ from "jquery";
const $square = $("#app3 .square");
console.log($square);
$square.on("click", () => {
  $square.toggleClass("active");
});
