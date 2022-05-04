import $api from './api.js'

//注册
export const addUser = async (data) => {
    var res = await $api.post(`register/`, data)
    return res
}


//获取验证码

export const getSms = async (data) => {

    var res = await $api.post('getSms/', data)
    return res
}

//登录
export const Login = async (data) => {

    var res = await $api.post('login/', data)
    return res
}