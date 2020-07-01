import $ from "jquery";
import './app2.css'
const html = `
 <section id="app2">
        <ol class="tab-bar">
          <li>1</li>
          <li>2</li>
        </ol>
        <ol class="tab-content">
          <li>内容1</li>
          <li>内容2</li>
        </ol>
      </section>`
const $element = $(html).appendTo($('.page'))
const $tabBar = $("#app2 .tab-bar");
const $tabContent = $("#app2 .tab-content");
const localKey = 'app2.index'
const index = localStorage.getItem(localKey) || 0
$tabBar.on("click", "li", (e) => {
  const $li = $(e.currentTarget);
  $li.addClass("selected").siblings().removeClass("selected");
  const index = $li.index();
  localStorage.setItem(localKey,index)
  console.log(index);
  $tabContent
    .children()
    .eq(index)
    .addClass("active")
    .siblings()
    .removeClass("active");
});
$tabBar.children().eq(index).trigger("click");