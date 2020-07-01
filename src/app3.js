import $ from "jquery";
import './app3.css'

const localKey = 'app3.active'
const eventBus = $({})
const m = {
    data: {
        active: (JSON.parse(localStorage.getItem(localKey)) || {active:'no'} )['active']
    },
    update(data) {
        console.log(data);
        Object.assign(m.data, data)
        console.log(m.data);
        console.log(JSON.stringify(m.data));
        localStorage.setItem(localKey, JSON.stringify(m.data))
        eventBus.trigger('m:updated')
    }
}
const v = {
    container: null,
    init(container) {
        v.container = $(container)
    },
    html(active) {
        return `
        <div class="square ${active === 'yes' ? 'active' : ''}"></div>
        `
    },
    render(active) {
        console.log(active);
        if (v.container.children().length !== 0) v.container.empty()
        $(v.html(active)).appendTo(v.container)
    }
}
const c = {
    init(container) {
        v.init(container)
        v.render(m.data.active)
        c.autoBindEvents()
        eventBus.on('m:updated', () => {
            v.render(m.data.active)
        })
    },
    events: {
        'click .square': 'active'
    },
    active() {
        if (m.data.active === 'yes') {
            m.update({active:'no'})
        } else {
            m.update({active:'yes'})
        }
    },
    autoBindEvents(){
        for(let key in c.events){
            const event = key.split(' ')[0]
            const element = key.split(' ')[1]
            v.container.on(event,element,c[c.events[key]])
        }
    }
}

export default c
