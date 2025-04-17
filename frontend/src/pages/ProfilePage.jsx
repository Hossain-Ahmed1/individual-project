import { Button, Container, Tabs, Flex,For, Heading } from '@chakra-ui/react'
import React, { useEffect,useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { deleteItem, fetchItems } from '@/api/Item'
import { jwtDecode } from 'jwt-decode'
import ItemCard from '../components/ItemCard'
import { fetchUser } from '@/api/User'
import { getTradeoffers } from '@/api/Tradeoffer'
import OfferCard from '@/components/OfferCard'

const ProfilePage = () => {
    const navigate = useNavigate()
    const [items, setItems] = useState([])
    const [user,setUser] = useState('')
    const [sentOffers,setSentOffers] = useState([])
    const [recievingOffers,setRecievingOffers] = useState([])
    useEffect(() =>{
        const checkSession = () => {
            const token = sessionStorage.getItem("User")
            if (!token){
              navigate("/login")
            }
        }
      async function fetchData() {
          const data = await fetchItems()
          setItems(data.filter((item) => item.owner == jwtDecode(sessionStorage.getItem("User")).id))
          const username = await fetchUser(jwtDecode(sessionStorage.getItem("User")).id)
          setUser(username)
        }
      const fetchOffers = async () => {
        const data = await getTradeoffers()
        setSentOffers(data.filter(offer => offer.sender == jwtDecode(sessionStorage.getItem("User")).id))
        setRecievingOffers(data.filter(offer => offer.reciever == jwtDecode(sessionStorage.getItem("User")).id))
      }
      checkSession()
      fetchData()
      fetchOffers()
    },[])

    function handleLogout(){
        sessionStorage.removeItem("User")
        navigate("/")
      }


    const handleDelete = async(id) => {
      const response = await deleteItem(id)
      const data = await fetchItems()
      setItems(data.filter((item) => item.owner == jwtDecode(sessionStorage.getItem("User")).id))
      if(response.status === 200){
        alert("item deleted")
      }else{
        alert("something went wrong")
      }
    }


  return (
    <Container >
      <Heading>Profile: {user}</Heading>
        <Tabs.Root lazyMount unmountOnExit defaultValue="tab-1">
      <Tabs.List>
      <Flex gap="4" justifyContent="space-between">
        <Tabs.Trigger value="tab-1">My Items</Tabs.Trigger>
        <Tabs.Trigger value="tab-2">Sent offers</Tabs.Trigger>
        <Tabs.Trigger value="tab-3">recieving offers</Tabs.Trigger>
        <Link to={"/add"}>
        <Button marginEnd="auto">Add Item</Button>
        </Link>
        </Flex>
      </Tabs.List>
      <Tabs.Content value="tab-1">
        <Container m={4} p={4} height="dvh">
        <For each={items} >
              {(item, index) =>
              <Container key={item._id}>
              <ItemCard  item = {item}/>
              <Button onClick={()=>handleDelete(item._id)}>Delete</Button>
              </Container> 
              }
        </For>
        </Container>
      </Tabs.Content>
      <Tabs.Content value="tab-2">
      <Container m={4} p={4} height="dvh">
        <For each={sentOffers} >
              {(offer, index) =>
              <Container key={offer._id}>
                <OfferCard offer={offer} />
              </Container> 
              }
        </For>
        </Container>
      </Tabs.Content>
      <Tabs.Content value="tab-3">
      <Container m={4} p={4} height="dvh">
        <For each={recievingOffers} >
              {(offer, index) =>
              <Container key={offer._id}>
                <OfferCard offer={offer} />
              </Container> 
              }
        </For>
        </Container>
      </Tabs.Content>
    </Tabs.Root>
        <Button m={8} onClick={handleLogout}>Logout</Button>
    </Container>
  )
}

export default ProfilePage