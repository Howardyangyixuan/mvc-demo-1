import $ from 'jquery'
class EventBus {
    constructor() {
        this._eventBus = $(window)
        //window可以，空对象不行
    }
    on(eventName,fn) {
        return this._eventBus.on(eventName,fn)
    }
    trigger(eventName,data) {
        return this._eventBus.trigger(eventName,data)
    }
    off(eventName,fn) {
        return this._eventBus.off(eventName,fn)
    }
}
export default  EventBus