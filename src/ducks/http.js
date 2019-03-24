import axios from "axios/index"

export function setHttpRequestsDefault() {
    axios.defaults.baseURL = 'http://localhost:8080/api/'
    axios.defaults.headers.post['Accept'] = 'application/json'
    axios.defaults.headers.post['Content-Type'] = 'application/json'
}