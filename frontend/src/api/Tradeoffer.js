import { URL } from "./congig"
import axios from "axios"

//make one
export const createTradeoffer = async(trade) => {
    const response = await axios.post(`${URL}/api/trade`,trade)
    return response
}

//get all
export const getTradeoffers =  async() => {
    const response = await axios.get(`${URL}/api/trade`)
    const data = response.data.data
    return data
}

//delete one
export const deleteTradeoffer = async(id) => {
    const response = await axios.delete(`${URL}/api/trade/${id}`,id)
    return response
}

//create a trade
export const createTrade = async(trade) => {
    const response = await axios.post(`${URL}/api/tradedone`,trade)
    return response
}