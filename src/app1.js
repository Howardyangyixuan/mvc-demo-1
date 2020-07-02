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


//其他都C
const c = {
    v:null,
    container:null,
    initV(){
        c.v = new View({
            container: c.container,
            html: `
            <div class="output">
              <span id="number">{{n}}</span>
              <button id="add1">+1</button>
              <button id="subtract1">-1</button>
              <button id="multiply2">✖2</button>
              <button id="divide2">➗2</button>
            </div>
            `,
            render(n) {
                if (c.v.container.children.length !== 0) c.v.container.empty()
                $(c.v.html.replace('{{n}}', n)).prependTo(c.v.container)

            }
        })
    },
    init(container) {
        c.container = container
        c.initV()
        c.v.render(m.data.n)
        // c.ui = {
        //     button1: $("#add1"),
        //     button2: $("#subtract1"),
        //     button3: $("#multiply2"),
        //     button4: $("#divide2"),
        //     number: $("#number")
        // }
        c.autoBindEvents()
        eventBus.on('m:updated', () => {
            c.v.render(m.data.n)
        })
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
        for (let key in c.events) {
            const event = key.split(' ')[0]
            const element = key.split(' ')[1]
                c.v.container.on(event, element, () => {
                c[c.events[key]]();
                // m.update()
                // v.render(m.data.n)
            })
        }
    }

}

// c.init('.page')
export default c