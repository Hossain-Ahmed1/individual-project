import { loginUser, registerUser } from '@/api/User'
import { Box, Container, Input, Heading, VStack, Button,Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const LoginPage = () => {
    const [user,setUser] = useState({
        email: "",
        password: ""
    })
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value})
        
      }
    const handleLogin = async () =>{
        
        const testUser = 
        {
            "email": "ho@4.com",
            "password": "123"
          }
        const response = await loginUser(testUser)
        console.log(response.data.data.name)
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