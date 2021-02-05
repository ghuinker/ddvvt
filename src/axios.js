import Vue from 'vue'
import axios from 'axios'

let http = axios.create()

http.defaults.xsrfHeaderName = 'X-CSRFToken'
http.defaults.xsrfCookieName = 'csrftoken'
http.defaults.withCredentials = true


http.interceptors.response.use(
    response => {
        return response.data
    })

Vue.prototype.$axios = http;