import { URL } from "./congig"
import axios from "axios"

export const createTradeoffer = async(trade) => {
    const response = await axios.post(`${URL}/api/trade`,trade)
    return response
}
export const getTradeoffers =  async() => {
    const response = await axios.get(`${URL}/api/trade`)
    const data = response.data.data
    return data
}