import { URL } from "./congig"
import axios from "axios"

//create one
export const createLivetrade = async(live) => {
    const response = await axios.post(`${URL}/api/livetrade`,live)
    return response
}

//get all
export const getLivetrades =  async() => {
    const response = await axios.get(`${URL}/api/livetrade`)
    const data = response.data.data
    return data
}

//get one
export const getLivetrade =  async(id) => {
    const response = await axios.get(`${URL}/api/livetrade/${id}`)
    const data = response.data.data
    return data
}

//delete one
export const deleteLiveTrade = async(id) => {
    console.log('del')
    const response = await axios.delete(`${URL}/api/livetrade/${id}`)
    return response
}