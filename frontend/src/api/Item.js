import { URL } from "./congig"
import axios from "axios"

export const fetchItems = async() =>{
    const response = await axios.get(`${URL}/api/items`)
    const data = response.data.data
    return data
}

export const createItem = async(item) =>{
    const response = await axios.post(`${URL}/api/items`,item)
    return response
}
export const fetchItem = async(id)=>{
    
}

export const deleteItem = async(id) =>{
    const response = await axios.delete(`${URL}/api/items/${id}`)
    return response
}