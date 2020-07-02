import $ from "jquery";
import './app2.css'
import Model from "./base/Model";
import View from "./base/View";
import EventBus from "./base/EventBus";

const eventBus = new EventBus()
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
const init = (container) => {
    const view = new View({
        eventBus: eventBus,
        container: container,
        data: m.data,
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
        events: {
            'click .tab-bar li': 'x'
        },
        render(data) {
            const index = data.index
            if (this.container.children.length !== 0) this.container.empty()
            $(this.html(index)).prependTo(this.container)
        },
        x(e) {
            const index = parseInt(e.currentTarget.dataset.index)
            m.update({index})
            //等价于 m.update({index:index})

        }
    })
}


export default init