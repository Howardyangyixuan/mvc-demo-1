import $ from "jquery";
import './app1.css'
import Model from "./base/Model";
import View from "./base/View";
import Vue from 'vue'

console.log(Vue);
//数据相关M
//视图相关V
//其他都C
//全在Vue里
const init = (container) => {
    new Vue({
        el: container,
        data: {n: parseFloat(localStorage.getItem("n")) || 100 },
        methods: {
            add() {
                this.n+=1
            },
            subtract() {
                this.n-=1
            },
            multiply() {
                this.n*=2
            },
            divide() {
                this.n/=2
            }
        },
        watch:{
            n(){
                localStorage.setItem('n',JSON.stringify(this.n))
            }
        },
        template: `
            <section>
                <div class="output">
                    <span id="number">{{n}}</span>
                    <button @click="add">+1</button>
                    <button @click="subtract">-1</button>
                    <button @click="multiply">✖2</button>
                    <button @click="divide">➗2</button>
                </div>
            </section>
        `
    })
}


// c.init('.page')
export default init