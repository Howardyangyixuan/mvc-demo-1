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
    container:null,
    init(container) {
        v.container = $(container)
        v.render()
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
    render() {
        if (v.container.children.length!==0)v.container.empty()
        $(v.html.replace('{{n}}', m.data.n)).prependTo(v.container)

    }
}


//其他都C
const c = {
    init(container) {
        v.init(container)
        c.ui = {
            button1: $("#add1"),
            button2: $("#subtract1"),
            button3: $("#multiply2"),
            button4: $("#divide2"),
            number: $("#number")
        }
        c.bindEvents()
    },
    bindEvents() {
        console.log(v.container)
        v.container.on('click', '#add1', () => {
            m.data.n++
            m.update()
            v.render()
        })
        v.container.on('click', '#subtract1', () => {
            m.data.n--
            m.update()
            v.render()
        })
        v.container.on('click', '#multiply2', () => {
            m.data.n *= 2
            m.update()
            v.render()
        })
        v.container.on('click', '#divide2', () => {
            m.data.n /= 2
            m.update()
            v.render()
        })
    }

}

// c.init('.page')
export default c