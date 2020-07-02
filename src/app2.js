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

const view = {
    container: null,
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
    init(container) {
        view.container = $(container)
        view.render(m.data.index)
        view.autoBindEvents()
        eventBus.on('m:updated', () => {
            view.render(m.data.index)
        })
    },
    events: {
        'click .tab-bar li': 'x'
    },
    render(index) {
        if (view.container.children.length !== 0) view.container.empty()
        $(view.html(index)).prependTo(view.container)
    },
    x(e) {
        const index = parseInt(e.currentTarget.dataset.index)
        m.update({index})
        //等价于 m.update({index:index})

    }
    ,
    autoBindEvents() {
        for (let key in view.events) {
            const event = key.split(' ')[0]
            const element = key.split(' ')[2]
            view.container.on(event, element, (e) => {
                view[view.events[key]](e);
                // m.update()
                // v.render(m.data.n)
            })
        }
    }

}

export default view