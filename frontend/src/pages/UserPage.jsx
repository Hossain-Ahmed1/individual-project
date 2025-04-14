import { fetchItems } from '@/api/Item'
import { fetchUser } from '@/api/User'
import { Container, For, Heading, VStack, Text, Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ItemCard from '@/components/ItemCard'
import { jwtDecode } from 'jwt-decode'

const UserPage = () => {
  const param = useParams()
  const [user,setUser] = useState({
    name:"",
    id:param.id
  })
  const [items,setItems] = useState([])
  const [session,setSession] = useState(0)
  useEffect(()=>{
    const fetchData = async()=>{
      const response = await fetchUser(param.id)
      if(response){
        setUser({...user,name:response})
        const data = await fetchItems()
        setItems(data.filter((item) => item.owner === user.id))
      }
      if(param.id === jwtDecode(sessionStorage.getItem("User")).id){
        setSession(!session)
      }
    }
    fetchData()
  },[])

  return (
    <Container>
      <VStack>
      <Heading m={4}>User: {user.name}</Heading>
      {!session?<Button>trade with user</Button>:<></>}
      <Text>Items: </Text>
      <For each={items} >
              {(item, index) =>
              <Container key={item._id}>
              <ItemCard  item = {item}/>
              </Container> 
              }
        </For>
      </VStack>
    </Container>
  )
}

export default UserPage