import { URL } from "./congig"
import axios from "axios"


//get one
export const fetchUser = async(id) => {
    if (id == ''){
        return ''
    }
    const response = await axios.get(`${URL}/api/users/${id}`)
    const data = response.data.data
    return data
}

//make one
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

//login user
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