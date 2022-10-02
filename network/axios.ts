import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { ShowTost } from '../utils/utils'
const instance = axios.create({
    baseURL: 'http://192.168.0.9/api/',
    //默认超时时间
    timeout: 12000,
    //跨域请求，允许保存cookie
    withCredentials: true
})

instance.interceptors.request.use(
    (config) => {
        config.headers = {
            'Authorization': 'Basic dHdpdHRlcjp0d2l0dGVyX3NlY3JldA==',
            'User-Type': 'app'
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)
instance.interceptors.response.use(
    (resp) => {
        const status = resp.status || resp.data.code
        const message = resp.data.msg || resp.data.error_description || '网络发生故障，请稍后再试'
        if (status === 401) {
            const navigation = useNavigation()
            // @ts-ignored
            navigation.navigate('Login')
            return Promise.reject(message)
        }
        if (status !== 200) {
            ShowTost(message)
            return Promise.reject(message)
        }
        console.log(resp.data)
        return resp.data
    },
    (error) => {
        const msg = error.message || '网络发生故障，请稍后再试'
        ShowTost(msg)
        return Promise.reject(msg)
    }
)

export default instance