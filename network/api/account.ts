import { stringMd5 } from 'react-native-quick-md5'
import axios from '../axios'

export const appRegister = (param: { account: string, password: string, confirmPassword: string }): Promise<any> => {
    return axios(
        {
            method: 'post',
            url: 'twitter-api/account/register',
            data: { ...param }
        }
    )
}

export const passwordLogin = (param: { username: string, password: string }): Promise<any> => {
    param.password = stringMd5(param.password)
    return token('password', param)
}

export const refreshToken = (refresh_token: string): Promise<any> => {
    return token('refresh_token', { refresh_token })
}

export const token = (grant_type: 'password' | 'refresh_token', param: any): Promise<any> => {
    return axios(
        {
            method: 'post',
            url: 'auth/oauth/token',
            params: { ...param, grant_type: grant_type }
        }
    )
}