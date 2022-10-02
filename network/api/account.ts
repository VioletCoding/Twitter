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

export const appLogin = (param: { username: string, password: string }): Promise<any> => {
    param.password = stringMd5(param.password)
    return axios(
        {
            method: 'post',
            url: 'auth/oauth/token',
            params: { ...param, grant_type: 'password' }
        }
    )
}