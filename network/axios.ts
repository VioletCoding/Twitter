import axios from 'axios'
const instance = axios.create({
    //默认超时时间
    timeout: 12000,
    //跨域请求，允许保存cookie
    withCredentials: true,
    validateStatus: (status) => status >= 200 && status <= 500
})

instance.interceptors.request.use(
    (config) => {
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
            return Promise.reject(message)
        }
        if (status === 403) {
            const msg = '暂无权限访问此内容'
            return Promise.reject(msg)
        }
        if (status !== 200) {
            return Promise.reject(message)
        }
        return resp
    },
    (error) => {
        const msg = error.message || '网络发生故障，请稍后再试'
        return Promise.reject(msg)
    }
)

export default instance