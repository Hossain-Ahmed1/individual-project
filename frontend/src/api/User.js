import { URL } from "./congig"
import axios from "axios"

export const fetchUsers = async() =>{
    
    const response = await axios.get(`${URL}/api/users`)
    const data = response.data.data
    return data
}

export const fetchUser = async(id) => {
    const response = await axios.get(`${URL}/api/users/${id}`)
    const data = response.data.data
    return data
}