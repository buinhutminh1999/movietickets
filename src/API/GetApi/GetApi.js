import axios from "axios"
import { TOKEN } from "../../ulti/setting"


export const getAPI = (url) => { 
    return axios({
        method: 'GET',
        url: url,
        headers: {
            TokenCybersoft: TOKEN
        }
    })
 }