import $ from 'jquery'

class View {
    // constructor({container, html, render,data,eventBus,events})
    constructor(options) {
        // console.log(options.data);
        Object.assign(this,options)
        this.container = $(this.container)
        // this.html = html
        // this.render = render
        // this.container = $(container)
        // this.data = data
        // console.log(this.data);
        this.render(this.data)
        // this.events = events
        this.autoBindEvents()
        this.eventBus.on('m:updated', () => {
            this.render(this.data)
        })
    }
    autoBindEvents() {
        for (let key in this.events) {
            const index = key.indexOf(' ')
            const event = key.substr(0,index)
            const element = key.substr(index+1,key.length)
            // console.log(event);
            // console.log(element);
            // const event = key.split(' ')[0]
            // const element = key.split(' ')[1]
            this.container.on(event, element, (e) => {
                this[this.events[key]](e);
                // m.update()
                // v.render(m.data.n)
            })
        }
    }
}

export default View