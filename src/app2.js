import $ from "jquery";
import './app2.css'
import Model from "./base/Model";

const eventBus = $({})
const localKey = 'app2.index'
const m = new Model({
    data: {
        index: parseInt((JSON.parse(localStorage.getItem(localKey)) || {index: 1})['index'])
    },
    update(data) {
        // console.log('hi');
        // console.log(data);
        Object.assign(m.data, data)
        localStorage.setItem(localKey, JSON.stringify(m.data));
        eventBus.trigger('m:updated')
    }
})
const v = {
    container: null,
    init(container) {
        v.container = $(container)
    },
    html: (index) => {
        return `
        <ol class="tab-bar">
        <li class='${index === 0 ? 'selected' : ''} 'data-index='0'>1</li>
        <li class='${index === 1 ? 'selected' : ''} 'data-index='1'>2</li>
        </ol>
        <ol class="tab-content">
        <li class='${index === 0 ? 'active' : ''}'>内容1</li>
        <li class='${index === 1 ? 'active' : ''}'>内容2</li>
        </ol>
        `
    },
    render(index) {
        if (v.container.children.length !== 0) v.container.empty()
        $(v.html(index)).prependTo(v.container)
    }

}

const c = {
    init(container) {
        v.init(container)
        v.render(m.data.index)
        c.autoBindEvents()
        eventBus.on('m:updated', () => {
            v.render(m.data.index)
        })
    },
    events: {
        'click .tab-bar li': 'x'
    },
    x(e) {
        const index = parseInt(e.currentTarget.dataset.index)
        m.update({index})
        //等价于 m.update({index:index})

    }
    ,
    autoBindEvents() {
        for (let key in c.events) {
            const event = key.split(' ')[0]
            const element = key.split(' ')[2]
            v.container.on(event, element, (e) => {
                c[c.events[key]](e);
                // m.update()
                // v.render(m.data.n)
            })
        }
    }

}

export default c