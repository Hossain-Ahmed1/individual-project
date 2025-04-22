import { URL } from "./congig"
import axios from "axios"

//fetch all items
export const fetchItems = async() =>{
    const response = await axios.get(`${URL}/api/items`)
    const data = response.data.data
    return data
}

//create an item
export const createItem = async(item) =>{
    const response = await axios.post(`${URL}/api/items`,item)
    return response
}

//fetch one item from id
export const fetchItem = async(id)=>{
    const response = await axios.get(`${URL}/api/items/${id}`)
    return response
}

//delete item from id
export const deleteItem = async(id) =>{
    const response = await axios.delete(`${URL}/api/items/${id}`)
    return response
}