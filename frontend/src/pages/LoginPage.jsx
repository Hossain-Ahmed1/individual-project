import { loginUser, registerUser } from '@/api/User'
import { Box, Container, Input, Heading, VStack, Button,Text } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"


const LoginPage = () => {
  const navigate = useNavigate()
    useEffect(()=>{
      const checkSession = () =>{
        const token = sessionStorage.getItem("User")
        if (token){
          navigate("/profile")
        }
      }
      checkSession()
    },[])
    const [user,setUser] = useState({
        email: "",
        password: ""
    })
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value})
        
      }
    const handleLogin = async () =>{
        
        const response = await loginUser(user)
        if (response?.status === 200){
          sessionStorage.setItem("User", response.data.data)
          navigate("/home")
          axios.defaults.headers.common["Authorization"] = `Bearer ${response}`
        }else if (response.status){
          alert(response.data.message)
        }
    }
  return (
        <Container>
          <VStack spacing={8}>
            <Heading>
              Login to your account
            </Heading>
            <Box w={"full"} p={6} rounded={"lg"} shadow={"md"}>
              <VStack spacing={4}>
                    <Input placeholder="email" type='email' onChange={handleChange} name="email"/>
                    <Input placeholder="password" type='password' onChange={handleChange} name="password"/>
                    <Button onClick={handleLogin} type='submit' w='full'>Submit</Button>
              </VStack>
            </Box>
        </VStack>
        </Container>
  )
}

export default LoginPage