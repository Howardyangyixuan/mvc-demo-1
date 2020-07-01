import $ from "jquery";
import './app1.css'

console.log($);
//初始化
const html = `
 <section id="app1">
        <div class="output">
          <span id="number">100</span>
          <button id="add1">+1</button>
          <button id="subtract1">-1</button>
          <button id="multiply2">✖2</button>
          <button id="divide2">➗2</button>
        </div>
      </section>
`
const $element = $(html).prependTo($('.page'))

//初始化操作元素和数据
const $button1 = $("#add1");
console.log($button1);
const $button2 = $("#subtract1");
const $button3 = $("#multiply2");
const $button4 = $("#divide2");
const $number = $("#number");
const n = localStorage.getItem("n");
$number.text(n || 100);

//绑定事件
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
