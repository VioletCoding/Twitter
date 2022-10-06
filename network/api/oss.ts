import axios from "../axios"

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