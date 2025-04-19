import { fetchItems } from '@/api/Item'
import { getLivetrade } from '@/api/Livetrade'
import { fetchUser } from '@/api/User'
import { Container, Heading, Text, Stack, For, Checkbox, CheckboxGroup, Button } from '@chakra-ui/react'
import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CheckboxItemCard from '@/components/CheckboxItemCard'
import {io} from "socket.io-client"

const LiveTradePage = ({socket}) => {
  const param = useParams()
  const [user,setUser] = useState('')
  const [otherUser,setOtherUser] = useState('')
  const [otherUsername,setOtherUsername] = useState('')
  const [userItems,setUserItems] = useState([])
  const [userChosenItems,setUserChosenItems] = useState([])
  useEffect(()=>{
    const checkSession = async()=>{
      const token = jwtDecode(sessionStorage.getItem("User"))
      if (!token){
        navigate("/login")
      }
      const data = await getLivetrade(param.id)
      if (!data.sender == token.id || !data.invited == token.id){
        navigate("/login")
      }
      socket.emit('join room', param.id)
      socket.emit('broadcast user',{userId: token.id, room:param.id})
      setUser(token.id)
    }
  const fetchData = async () => {
    const data = await fetchItems()
    setUserItems(data.filter((item) => item.owner == jwtDecode(sessionStorage.getItem("User")).id))
  }
  checkSession()
  fetchData()
  },[])
  socket.on("fetch user",(data)=>{
      setOtherUser(data)
      socket.emit('broadcast user2',{userId: user, room:param.id})

  })
  socket.on("fetch user2",(data)=>{
    setOtherUser(data)

})

  const GetUsername = ({id}) => {
    useEffect(()=>{
      const fetchData = async()=>{
        const response = await fetchUser(id)
        setOtherUsername (response)
      }
      fetchData()
    },[])
    return (
      <>{otherUsername}</>
    )
  }

  return (
    <Container>
    <Text>Live trading with: <GetUsername id={otherUser} /></Text>
    <Text>Your Items:</Text>
        <Stack m={4}>
          <CheckboxGroup>
        <For each={userItems} >
              {(item, index) =>
              <Container key={item._id}>
              <CheckboxItemCard item={item} chosenItems={userChosenItems} setChosenItem={setUserChosenItems}/>
              </Container> 
              }
        </For>
        </CheckboxGroup>
        </Stack>
        <Button>Submit</Button>
    </Container>
  )
}

export default LiveTradePage