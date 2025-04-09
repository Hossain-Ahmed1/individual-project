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

export const registerUser = async (newUser) => {
    const response = await axios.post(`${URL}/api/users`, newUser)
                                    .catch((err) =>{
                                        if (err.response){
                                            return err.response
                                        }else if (err.request){
                                            return err.request
                                        }
                                        
                                    })
    return response
}

export const loginUser = async(userCred) =>{
    const response = await axios.post(`${URL}/api/users/login`,userCred)
                                .catch((err) =>{
                                    if (err.response){
                                        return err.response
                                    }else if (err.request){
                                        return err.request
                                    }
                                })    
    return response   
}