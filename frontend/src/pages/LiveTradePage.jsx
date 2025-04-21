import { fetchItems } from '@/api/Item'
import { getLivetrades,getLivetrade, deleteLiveTrade } from '@/api/Livetrade'
import { fetchUser } from '@/api/User'
import { Container, Heading, Text, Stack, For, Checkbox, CheckboxGroup, Button } from '@chakra-ui/react'
import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import LiveCheckBoxItemCard from '@/components/LiveCheckBoxItemCard'
import {io} from "socket.io-client"
import { createTrade } from '@/api/Tradeoffer'

const LiveTradePage = ({socket}) => {
  const navigate = useNavigate()
  const param = useParams()
  const [user,setUser] = useState('')
  const [otherUser,setOtherUser] = useState('')
  const [otherUsername,setOtherUsername] = useState('')
  const [userItems,setUserItems] = useState([])
  const [otherUserItems,setOtherUserItems] = useState([])
  const [userChosenItems,setUserChosenItems] = useState([])
  const [otherUserChosenItems,setOtherUserChosenItems] = useState([])
  const [lockCheckbox,setLockCheckbox] = useState(false)
  const [submit,setSubmit] = useState(false)
  const [otherUserSubmit,setOtherUserSubmit] = useState(false)
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
  socket.on("fetch user",async(data)=>{
      setOtherUser(data)
      const items = await getOtherUserItems(data)
      setOtherUserItems(items)
      socket.emit('broadcast user2',{userId: user, room:param.id})

  })
  socket.on("fetch user2",async(data)=>{
    setOtherUser(data)
    const items = await getOtherUserItems(data)
    setOtherUserItems(items)

})
  const getOtherUserItems = async(id)=>{
    const data = await fetchItems()
    return data.filter((item) => item.owner == id)
  }

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

  const submitItems = async()=>{
    
    setSubmit(!submit)
    setLockCheckbox(!lockCheckbox)
    socket.emit('user submited',{submit:!submit,room:param.id})
    if (!submit && otherUserSubmit){
      const trade = {user1:user,user2:otherUser,user1_items:userChosenItems,user2_items:otherUserChosenItems,room:param.id}
      const response = await createTrade(trade)
      const del = await deleteLiveTrade(param.id)
    }
  }

  socket.on('other user submit',(data)=>{
    setOtherUserSubmit(data)
    if (submit){
      socket.emit('both submited',{room:param.id})
    }

  })
  return (
    <Container>
    <Text>Live trading with: <GetUsername id={otherUser} /></Text>
    <Text>Your Items:</Text>
        <Stack m={4}>
          <CheckboxGroup>
        <For each={userItems} >
              {(item, index) =>
              <Container key={item._id}>
              <LiveCheckBoxItemCard item={item} chosenItems={userChosenItems} setChosenItem={setUserChosenItems} socket={socket} room={param.id} readonly ={lockCheckbox}  user={true}/>
              </Container> 
              }
        </For>
        </CheckboxGroup>
        </Stack>
        <Text><GetUsername id={otherUser} /> Items:</Text>
        <Stack m={4}>
          <CheckboxGroup>
        <For each={otherUserItems} >
              {(item, index) =>
              <Container key={item._id}>
              <LiveCheckBoxItemCard item={item} chosenItems={otherUserChosenItems} setChosenItem={setOtherUserChosenItems} socket={socket} room={param.id} readonly ={true} user={false}/>
              </Container> 
              }
        </For>
        </CheckboxGroup>
        </Stack>
        <Button onClick={submitItems}>Submit</Button>
        {submit?<Text>Submited items </Text>:<></>}
        {otherUserSubmit?<Text> <GetUsername id={otherUser} /> has submited items</Text>:<></>}
    </Container>
  )
}

export default LiveTradePage