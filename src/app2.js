import $ from "jquery";
import './app2.css'
import Model from "./base/Model";
import View from "./base/View";
import Vue from 'vue'
import EventBus from "./base/EventBus";

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
        m.trigger('m:updated')
    }
})
const init = (container) => {
    const vue = new Vue({
        el: container,
        data: {
            index: parseInt(localStorage.getItem('index')) || 0
        },
        template: `
            <section id="app2">
                <ol class="tab-bar">
                    <li :class="index===0?'selected':''" @click="index=0">1</li>
                    <li :class="index===1?'selected':''" @click="index=1">2</li>
                </ol>
                <ol class="tab-content">
                    <li :class="index===0 ? 'active' : ''">内容1</li>
                    <li :class="index===1 ? 'active' : ''">内容2</li>
                </ol>
            </section>
        `,
        watch: {
            index() {
                localStorage.setItem('index', JSON.stringify(this.index))
            }

        },
        methods: {}
    })
}


export default init