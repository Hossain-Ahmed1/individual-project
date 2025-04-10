import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ProfilePage = () => {
    const navigate = useNavigate()
    useEffect(() =>{
        const checkSession = () => {
            const token = sessionStorage.getItem("User")
            if (!token){
              navigate("/login")
            }
        }
        checkSession()
    },[])
    function handleLogout(){
        sessionStorage.removeItem("User")
        navigate("/")
      }
  return (
    <button onClick={handleLogout}>Log out</button>
  )
}

export default ProfilePage