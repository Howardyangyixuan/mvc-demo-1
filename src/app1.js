import $ from "jquery";
import './app1.css'
import Model from "./base/Model";
import View from "./base/View";
//数据相关M
const eventBus = $({})

const m = new Model({
    data: {
        n: parseInt((JSON.parse(localStorage.getItem("m.data")) || {n: 100})['n'])
    },
    update(data) {
        Object.assign(m.data, data)
        localStorage.setItem("m.data", JSON.stringify(m.data));
        eventBus.trigger('m:updated')
        // localStorage.setItem("n", m.data.n);
    }
})
console.dir(m);
//视图相关V
const v = {

}


//其他都C
const view = {
    container: null,
    html: `
        <div class="output">
          <span id="number">{{n}}</span>
          <button id="add1">+1</button>
          <button id="subtract1">-1</button>
          <button id="multiply2">✖2</button>
          <button id="divide2">➗2</button>
        </div>
    `,
    init(container) {
        view.container = $(container)
        view.render(m.data.n)
        // c.ui = {
        //     button1: $("#add1"),
        //     button2: $("#subtract1"),
        //     button3: $("#multiply2"),
        //     button4: $("#divide2"),
        //     number: $("#number")
        // }
        view.autoBindEvents()
        eventBus.on('m:updated', () => {
            view.render(m.data.n)
        })
    },
    render(n){
    if (view.container.children.length !== 0) view.container.empty()
    $(view.html.replace('{{n}}', n)).prependTo(view.container)
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
    autoBindEvents() {
        for (let key in view.events) {
            const event = key.split(' ')[0]
            const element = key.split(' ')[1]
            view.container.on(event, element, () => {
                view[view.events[key]]();
                // m.update()
                // v.render(m.data.n)
            })
        }
    }

}

// c.init('.page')
export default view