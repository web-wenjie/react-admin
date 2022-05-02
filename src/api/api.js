import axios from 'axios'





const api = axios.create({
    baseURL:"http://localhost:8001/api/"
})



//拦截器 请求拦截
api.interceptors.request.use(
    config => {
         const token = window.sessionStorage.token;
         if(token) config.headers.aurization = token
       return config
    },
    err => {
        return Promise.reject(err)
    }
)



//响应拦截

api.interceptors.response.use(resonse => {

    if(resonse.status === 401 ) return window.location.href='/login'

    return resonse.data
})


export default api;