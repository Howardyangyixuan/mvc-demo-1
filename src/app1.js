import $ from "jquery";
import './app1.css'
import Model from "./base/Model";
import View from "./base/View";
import EventBus from "./base/EventBus";

//数据相关M
const eventBus = new EventBus()

const m = new Model({
    data: {
        n: parseFloat((JSON.parse(localStorage.getItem("m.data")) || {n: 100})['n'])
    },
    update(data) {
        Object.assign(m.data, data)
        localStorage.setItem("m.data", JSON.stringify(m.data));
        eventBus.trigger('m:updated')
        // localStorage.setItem("n", m.data.n);
    }
})
// console.dir(m);
//视图相关V
//其他都C
const init = (container)=>{
    const view = new View({
        container: container,
        data:m.data,
        eventBus:eventBus,
        html: `
        <div class="output">
          <span id="number">{{n}}</span>
          <button id="add1">+1</button>
          <button id="subtract1">-1</button>
          <button id="multiply2">✖2</button>
          <button id="divide2">➗2</button>
        </div>
    `,
        render(data){
            const n = data.n
            if (this.container.children.length !== 0) this.container.empty()
            $(this.html.replace('{{n}}', n)).prependTo(this.container)
        },
        events: {
            'click #add1': 'add',
            'click #subtract1': 'subtract',
            'click #multiply2': 'multiply',
            'click #divide2': 'divide',
        },
        add() {
            m.update({n: m.data.n + 1})
        },
        subtract() {
            m.update({n: m.data.n - 1})
        },
        multiply() {
            m.update({n: m.data.n * 2})
        },
        divide() {
            m.update({n: m.data.n / 2})

        },
    })
}


// c.init('.page')
export default init