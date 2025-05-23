import { fetchItems } from '@/api/Item'
import { fetchUser } from '@/api/User'
import { Container, For, Heading, VStack, Text, Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ItemCard from '@/components/ItemCard'
import { jwtDecode } from 'jwt-decode'
import { createLivetrade } from '@/api/Livetrade'

const UserPage = () => {
  const param = useParams()
  const [user,setUser] = useState({
    name:"",
    id:param.id
  })
  const [items,setItems] = useState([])
  const [session,setSession] = useState(0)
  const navigate = useNavigate()
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
  const createLivesession = async () => {
    const livetrade = {
      sender: jwtDecode(sessionStorage.getItem("User")).id,
      invited:user.id
    }
    const response = await createLivetrade(livetrade)
    if (response.status == 201){
      navigate("/livetrade/"+response.data.data._id)
    }
  }

  return (
    <Container>
      <VStack>
      <Heading m={4}>User: {user.name}</Heading>
      {!session?<Link to={"/trade/"+user.id}><Button>trade with user</Button></Link>:<></>}
      {!session?<Button onClick={createLivesession}>Invite to live trade</Button>:<></>}
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