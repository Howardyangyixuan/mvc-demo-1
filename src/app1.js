import $ from "jquery";
import './app1.css'
//数据相关M
const eventBus = $({})
const m = {
    data: {
        n: parseInt((JSON.parse(localStorage.getItem("m.data"))|| {n:100})['n'])
    },
    update(data) {
        Object.assign(m.data,data)
        localStorage.setItem("m.data", JSON.stringify(m.data));

        eventBus.trigger('m:updated')
        // localStorage.setItem("n", m.data.n);
    }
}
//视图相关V
const v = {
    container: null,
    init(container) {
        v.container = $(container)
    },
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
        if (v.container.children.length !== 0) v.container.empty()
        $(v.html.replace('{{n}}', n)).prependTo(v.container)

    }
}


//其他都C
const c = {
    init(container) {
        v.init(container)
        v.render(m.data.n)
        // c.ui = {
        //     button1: $("#add1"),
        //     button2: $("#subtract1"),
        //     button3: $("#multiply2"),
        //     button4: $("#divide2"),
        //     number: $("#number")
        // }
        c.autoBindEvents()
        eventBus.on('m:updated',()=>{
            v.render(m.data.n)
        })
    },
    events: {
        'click #add1': 'add',
        'click #subtract1': 'subtract',
        'click #multiply2': 'multiply',
        'click #divide2': 'divide',
    },
    add() {
        m.update({n:m.data.n+1})
    },
    subtract() {
        m.update({n:m.data.n-1})
    },
    multiply() {
        m.update({n:m.data.n*2})
    },
    divide() {
        m.update({n:m.data.n/2})

    },
    autoBindEvents() {
        for (let key in c.events) {
            const event = key.split(' ')[0]
            const element = key.split(' ')[1]
            v.container.on(event,element,()=>{
                c[c.events[key]]();
                // m.update()
                // v.render(m.data.n)
            })
        }
    }

}

// c.init('.page')
export default c