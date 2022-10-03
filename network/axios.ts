import { StackActions, useNavigation } from '@react-navigation/native'
import { getAuthToken } from '@Storage/index'
import axios from 'axios'
import { errorToast } from '../utils/utils'
const instance = axios.create({
    baseURL: 'http://192.168.0.9/api/',
    //默认超时时间
    timeout: 12000,
    //跨域请求，允许保存cookie
    withCredentials: true
})
// 请求拦截器
instance.interceptors.request.use(
    async (config) => {
        const token = await getAuthToken()
        config.headers = {
            'Authorization': 'Basic dHdpdHRlcjp0d2l0dGVyX3NlY3JldA==',
            'Blade-Auth': `${token?.token_type} ${token?.access_token}` || '',
            'User-Type': 'app'
        }
        console.log(`\n
        Request Start: ======\n
        Request URI: ${config.baseURL}${config.url} \n 
        Method: ${config.method} \n 
        Data: ${JSON.stringify(config.data)} \n 
        Param: ${JSON.stringify(config.params)} \n 
        Header: ${JSON.stringify(config.headers)} \n
        Request End: ======`)
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)
// 响应拦截器
instance.interceptors.response.use(
    (resp) => {
        console.log(`\n
        Response Start: ======\n
        Data: ${JSON.stringify(resp.data)} \n
        HTTP STATUS: ${resp.status} \n
        Response End: ======`)

        const status = resp.status || resp.data.code
        const message = resp.data.msg || resp.data.error_description || '发生了错误，请稍后再试'
        if (status === 401) {
            const navigation = useNavigation()
            navigation.dispatch(StackActions.replace('Intro'))
            return Promise.reject(message)
        }
        if (status !== 200) {
            errorToast(message)
            return Promise.reject(message)
        }
        return resp.data
    },
    (error) => {
        const msg = error.response.data.msg || '发生了错误，请稍后再试'
        errorToast(msg)
        return Promise.reject(msg)
    }
)

export default instance