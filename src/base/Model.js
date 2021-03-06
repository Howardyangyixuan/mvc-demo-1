import EventBus from "./EventBus";

class Model extends EventBus {
    constructor(options) {
        super()
        const keys = ['data', 'update', 'delete', 'get', 'create']
        keys.forEach((key) => {
                if (key in options) {
                    this[key] = options[key]
                }
            }
        )
    }

    create() {
        console?.error?.('未实现create')
    }

    delete() {
        console?.error?.('未实现delete')
    }

    update() {
        console?.error?.('未实现update')
    }

    get() {
        console?.error?.('未实现get')
    }
}

export default Model