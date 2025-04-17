import { fetchItems } from '@/api/Item'
import { fetchUser } from '@/api/User'
import { Container, Heading, Text, Stack, For, Checkbox, CheckboxGroup, Button } from '@chakra-ui/react'
import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CheckboxItemCard from '@/components/CheckboxItemCard'
import { createTradeoffer } from '@/api/Tradeoffer'

const TradingPage = () => {
  const navigate = useNavigate()
  const params = useParams()
  const [user,setUser] = useState("")
  const [reqUser, setReqUser] = useState("")
  const [userItems,setUserItems] = useState([])
  const [reqUserItems,setReqUserItems] = useState([])
  const [userChosenItems,setUserChosenItems] = useState([])
  const [reqUserChosenItems,setReqUserChosenItems] = useState([])
  useEffect(()=>{
    const checkSession = () => {
      const token = sessionStorage.getItem("User")
      if (!token){
        navigate("/login")
      }else if(params.id === jwtDecode(token).id){
        navigate("/profile")
      }

  }
  const fetchData = async () => {
    setUser( await fetchUser(jwtDecode(sessionStorage.getItem("User")).id))
    setReqUser(await fetchUser(params.id))
    const data = await fetchItems()
    setUserItems(data.filter((item) => item.owner == jwtDecode(sessionStorage.getItem("User")).id))
    setReqUserItems(data.filter((item) => item.owner == params.id))
  }
  checkSession()
  fetchData()

  },[])

  const makeTrade = ()=>{
    const trade = {
      sender:jwtDecode(sessionStorage.getItem("User")).id,
      offering:userChosenItems,
      reciever:params.id,
      wanting:reqUserChosenItems,
      status:"pending"
    }
    return trade

  }

  const createTrade = async () => {
    const trade = makeTrade()
    const response = await createTradeoffer(trade)
  }
  return (
    <Container>
        <Heading>You: '{user}' are trading with: '{reqUser}'</Heading>
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
        <Text>{reqUser} items:</Text>
        <Stack m={4}>
        <CheckboxGroup>
        <For each={reqUserItems} >
              {(item, index) =>
              <Container key={item._id}>
              <CheckboxItemCard item={item} chosenItems={reqUserChosenItems} setChosenItem={setReqUserChosenItems}/>
              </Container> 
              }
        </For>
        </CheckboxGroup>
        
        </Stack>
        <Button onClick={createTrade}>Submit</Button>
    </Container>
  )
}

export default TradingPage