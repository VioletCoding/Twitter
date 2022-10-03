import { Media } from '@Pages/home/components/types'
import { PageQuery } from 'types'
import axios from '../axios'

/**
 * 新增推文
 * @param param param
 * @returns Promise
 */
export const addFleet = (param: { content: string, mediaList?: Media[] }): Promise<any> => {
    return axios({
        method: 'post',
        url: 'twitter-api/fleet/add',
        data: { ...param }
    })
}

/**
 * 推文列表
 * @param query 分页参数
 * @param param param
 * @returns Promise
 */
export const fleetPage = (query: PageQuery, param?: any): Promise<any> => {
    return axios({
        method: 'get',
        url: 'twitter-api/fleet/page',
        params: { ...param, ...query }
    })
}