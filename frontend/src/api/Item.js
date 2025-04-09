import { URL } from "./congig"
import axios from "axios"

export const fetchItems = async() =>{
    
    const response = await axios.get(`${URL}/api/items`)
    const data = response.data.data
    return data
}