import { stringMd5 } from 'react-native-quick-md5'
import axios from '../axios'

/**
 * 注册 
 * @param param param
 * @returns Promise
 */
export const appRegister = (param: { account: string, password: string, confirmPassword: string }): Promise<any> => {
    return axios(
        {
            method: 'post',
            url: 'twitter-api/account/register',
            data: { ...param }
        }
    )
}
/**
 * 密码登录模式
 * @param param param
 * @returns Promise
 */
export const passwordLogin = (param: { username: string, password: string }): Promise<any> => {
    param.password = stringMd5(param.password)
    return token('password', param)
}

/**
 * 刷新令牌模式
 * @param refresh_token 刷新令牌
 * @returns Promise
 */
export const refreshToken = (refresh_token: string): Promise<any> => {
    return token('refresh_token', { refresh_token })
}

/**
 * token
 * @param grant_type 模式
 * @param param param
 * @returns Promise
 */
export const token = (grant_type: 'password' | 'refresh_token', param: any): Promise<any> => {
    return axios(
        {
            method: 'post',
            url: 'auth/oauth/token',
            params: { ...param, grant_type: grant_type }
        }
    )
}