import React,{useEffect,useState} from 'react'
import { Box, Container, Input, Heading, VStack, Button,Textarea } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'
import { createItem } from '@/api/Item'

const CreatePage = () => {
  const navigate = useNavigate()
  useEffect(()=>{
    const checkSession = () =>{
      const token = sessionStorage.getItem("User")
      if (!token){
        navigate("/login")
      }
    }
    checkSession()
  },[])

  const [item,setItem] = useState({
          name: "",
          owner: jwtDecode(sessionStorage.getItem("User")).id,
          desc: ""
      })
  const handleChange = (e) => {
        setItem({ ...item, [e.target.name]: e.target.value})
        
      }
  const addItem = async () =>{
    const response = await createItem(item)
    if(response.status === 201){
      alert("item added")
    }else {
      alert("something went worng")
    }
  }
  return (
        <Container>
          <VStack spacing={8}>
            <Heading>
              Add your item
            </Heading>
            <Box w={"full"} p={6} rounded={"lg"} shadow={"md"}>
              <VStack spacing={4}>
                <Input placeholder='name of item' onChange={handleChange} name="name"/>
                <Textarea placeholder='decription of item' onChange={handleChange} name="desc" />
                <Button onClick={addItem}>Submit</Button>
              </VStack>
            </Box>
          </VStack>
        </Container>
  )
}

export default CreatePage