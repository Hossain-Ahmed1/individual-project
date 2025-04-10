import { registerUser } from '@/api/User'
import { Box, Container, Input, Heading, VStack, Button,Text } from '@chakra-ui/react'
import React, { useState,useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom'


const RegisterPage = () => {
  const nav = useNavigate()
  useEffect(()=>{
    const checkSession = () =>{
      const token = sessionStorage.getItem("User")
      if (token){
        nav("/profile")
      }
    }
    checkSession()
  },[])

  const [user,setUser] = useState({
    name: "",
    email: "",
    password: ""
})

const handleChange = (e) => {
  setUser({ ...user, [e.target.name]: e.target.value})
  
}
const handleAddUser = async () =>{
    const response = await registerUser(user)
    alert(response.data?.message)
  }

  return (
    <Container>
      <VStack spacing={8}>
        <Heading>
          Register your account
        </Heading>
        <Box w={"full"} p={6} rounded={"lg"} shadow={"md"}>
          <VStack spacing={4}>
            <Input placeholder="name" onChange={handleChange} name="name"/>
            <Input placeholder="email" type='email' onChange={handleChange} name="email"/>
            <Input placeholder="password" type='password' onChange={handleChange} name="password"/>
            <Button onClick={handleAddUser} type='submit' w='full'>Submit</Button>
          </VStack>
        </Box>
        <Text>
        Already have an account: 
      </Text>
      <Link to={"/login"}>
        <Button>
          Click here to sign in
        </Button>
      </Link>
      </VStack>
    </Container>
  )
}

export default RegisterPage