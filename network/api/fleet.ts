import { Media } from '@Pages/home/components/types'
import { PageQuery } from 'types'
import axios from '../axios'

export const addFleet = (param: { content: string, mediaList?: Media[] }): Promise<any> => {
    return axios({
        method: 'post',
        url: 'twitter-api/fleet/add',
        data: { ...param }
    })
}

export const fleetPage = (query: PageQuery, param?: any): Promise<any> => {
    return axios({
        method: 'get',
        url: 'twitter-api/fleet/page',
        params: { ...param, ...query }
    })
}