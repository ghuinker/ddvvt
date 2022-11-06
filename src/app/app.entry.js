import 'vite/modulepreload-polyfill'

import { createApp } from 'vue'
import { RouterView } from 'vue-router'
import router from './router.js'
import useAxios from './axios.js'

createApp(RouterView).use(router).provide('axios', useAxios({})).mount('#app')
