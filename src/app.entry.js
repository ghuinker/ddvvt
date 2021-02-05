import { createApp } from 'vue';
import HelloThere from './components/HelloThere'

import './css/style.css'

const app = createApp({})

app.component('hello-there', HelloThere)

app.mount('#app')