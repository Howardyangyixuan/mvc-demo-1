import $ from "jquery";
import './app3.css'
const html = `
 <section id="app3">
        <div class="square"></div>
      </section>
`
const $element = $(html).appendTo($('.page'))
const $square = $("#app3 .square");
console.log($square);
const localKey = 'app3.active'
const active = localStorage.getItem(localKey) === 'yes'
// if(active){
//   $square.addClass('active')
// }else{
//   $square.removeClass('active')
// }
$square.toggleClass('active', active)
$square.on("click", () => {
    if ($square.hasClass('active')) {
        $square.removeClass('active')
        localStorage.setItem('app3.active', 'no')
    } else {
        $square.addClass('active')
        localStorage.setItem('app3.active', 'yes')
    }
    // $square.toggleClass("active");
});

