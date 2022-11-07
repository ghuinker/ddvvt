import { ref, onMounted, watch } from 'vue'
import useAxios from '@/axios.js'

export function urlToApiUrl(url, addApiPrepend = false) {
  const pathname = window.location.pathname
  let returnUrl = url
  // If no url given, default to current path
  if (!url) {
    returnUrl = pathname
  } else if (url.startsWith('//')) {
    returnUrl = url.substring(1, url.length)
    if (addApiPrepend) returnUrl = '/api' + returnUrl
    returnUrl += returnUrl.endsWith('/') ? '' : '/'
    return returnUrl
  }
  // Does not start with slash -> append to current path
  else if (!url.startsWith('/')) {
    const connectingSlash = pathname.endsWith('/') ? '' : '/'
    returnUrl = pathname + connectingSlash + url
  }
  // Starts with slash -> append to /username or /username/cp
  else {
    const pathsplt = pathname.split('/').filter(x => !!x) // Remove empty
    let prepend = ''
    if (pathsplt.length > 0) {
      prepend = '/' + pathsplt[0] // username
    }
    if (pathsplt.length > 1) {
      prepend += pathsplt[1] == 'cp' ? '/cp' : ''
    }
    returnUrl = prepend + url
  }
  // Append slash always
  returnUrl += returnUrl.endsWith('/') ? '' : '/'
  if (addApiPrepend) returnUrl = '/api' + returnUrl
  return returnUrl
}

function _getApi(url, { params = {}, enabled = true, initialData = null, requestOnMount = true }) {
  const data = ref(initialData)
  const isLoading = ref(false)
  const response = ref(null)
  const axios = useAxios({ onResponse: r => r })

  const request = async () => {
    if (!enabled) return
    const internalParams = params instanceof Function ? params() : params
    isLoading.value = true
    axios
      .get(url, {
        params: internalParams
      })
      .then(res => {
        isLoading.value = false
        response.value = res
        data.value = res.data
      })
  }

  watch(() => params, request)
  watch(() => url, request)

  onMounted(() => {
    if (requestOnMount) request()
  })

  return {
    isLoading,
    data,
    request,
    response
  }
}

export function getApi(...args) {
  if (args.length == 0) return _getApi('', {})
  if (args.length == 1) return _getApi(args[0], {})
  // Allow a second argument for initialData -> array for list is most common use case
  if (args.length == 2 && Array.isArray(args[1]))
    return _getApi(args[0], {
      initialData: args[1]
    })
  if (args.length == 2) return _getApi(...args)
}

export default {
  get: getApi
}
