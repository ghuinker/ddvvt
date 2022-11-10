import axios from 'axios'
import { urlToApiUrl } from '@/utils/api.js'

const createAxios = () => {
  let http = axios.create({
    baseURL: '/api'
  })

  http.defaults.xsrfHeaderName = 'X-CSRFToken'
  http.defaults.xsrfCookieName = 'csrftoken'
  http.defaults.withCredentials = true

  http.defaults.headers.common['Accept'] = 'application/json'
  http.defaults.headers.common['Cache-Control'] = 'no-cache'
  http.defaults.headers.common['Pragma'] = 'no-cache' // IOS
  http.defaults.headers.common['Expires'] = '0'

  http.defaults.notify = true

  http.interceptors.request.use(config => {
    try {
      config.url = urlToApiUrl(config.url)
    } catch (error) {
      console.error(error)
      return null
    }
    return config
  })
  return http
}

const useAxios = ({ onResponse = r => r.data }) => {
  const http = createAxios()
  http.interceptors.response.use(onResponse, error => console.error(error))
  return http
}
export default useAxios
