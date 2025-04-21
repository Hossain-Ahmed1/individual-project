import { URL } from "./congig"
import axios from "axios"

export const createLivetrade = async(live) => {
    const response = await axios.post(`${URL}/api/livetrade`,live)
    return response
}
export const getLivetrades =  async() => {
    const response = await axios.get(`${URL}/api/livetrade`)
    const data = response.data.data
    return data
}
export const getLivetrade =  async(id) => {
    const response = await axios.get(`${URL}/api/livetrade/${id}`)
    const data = response.data.data
    return data
}

export const deleteLiveTrade = async(id) => {
    console.log('del')
    const response = await axios.delete(`${URL}/api/livetrade/${id}`)
    return response
}