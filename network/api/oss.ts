import axios from "../axios"
/**
 * 
 * @param file FormData, 结构必须包含以下内容 { 'file' :  {  uri: 'file uri', name: 'filename', type: 'mime type, such as image/png'  } }
 * @returns 
 */
export const upload = (file: FormData): Promise<any> => {
    return axios({
        method: 'post',
        url: 'twitter-api/oss/endpoint/put-file',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: file
    })
}