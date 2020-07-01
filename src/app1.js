import $ from "jquery";
import './app1.css'
//数据相关M
const m = {
    data: {
        n: parseInt(localStorage.getItem("n"))
    },
    update() {
        localStorage.setItem("n", m.data.n);
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
        c.ui = {
            button1: $("#add1"),
            button2: $("#subtract1"),
            button3: $("#multiply2"),
            button4: $("#divide2"),
            number: $("#number")
        }
        c.autoBindEvents()
    },
    events: {
        'click #add1': 'add',
        'click #subtract1': 'subtract',
        'click #multiply2': 'multiply',
        'click #divide2': 'divide',
    },
    add() {
        m.data.n++;
    },
    subtract() {
        m.data.n--;
    },
    multiply() {
        m.data.n *= 2
    },
    divide() {
        m.data.n /= 2
    },
    autoBindEvents() {
        for (let key in c.events) {
            console.log(key.split(' ')[0]);
            console.log(key.split(' ')[1]);
            console.log(c.events[key]);
            const event = key.split(' ')[0]
            const element = key.split(' ')[1]
            v.container.on(event,element,()=>{
                c[c.events[key]]();
                m.update()
                v.render(m.data.n)
            })
        }
    }

}

// c.init('.page')
export default c