import { Button, Container, Tabs, Flex,For, Heading, HStack } from '@chakra-ui/react'
import React, { useEffect,useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { deleteItem, fetchItems } from '@/api/Item'
import { jwtDecode } from 'jwt-decode'
import ItemCard from '../components/ItemCard'
import { fetchUser } from '@/api/User'
import { createTrade, deleteTradeoffer, getTradeoffers } from '@/api/Tradeoffer'
import OfferCard from '@/components/OfferCard'
import { getLivetrades } from '@/api/Livetrade'
import InviteCard from '@/components/InviteCard'

const ProfilePage = () => {
    const navigate = useNavigate()
    const [items, setItems] = useState([])
    const [user,setUser] = useState('')
    const [sentOffers,setSentOffers] = useState([])
    const [recievingOffers,setRecievingOffers] = useState([])
    const [invites,setInvites] = useState([])
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
      const fetchInvites = async () => {
        const data = await getLivetrades()
        setInvites(data.filter(live => live.invited == jwtDecode(sessionStorage.getItem("User")).id))
      }
      checkSession()
      fetchData()
      fetchOffers()
      fetchInvites()
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

    const handleDeleteOffer = async(id) => {
      const response = await deleteTradeoffer(id)
      setSentOffers(sentOffers.filter(offer => offer._id !== id))
      setRecievingOffers(recievingOffers.filter(offer => offer._id !== id))
    }
    const handleAcceptOffer = async(offer) =>{
      const trade = {
        user1:offer.sender,
        user2:offer.reciever,
        user1_items:offer.offering,
        user2_items:offer.wanting

      }
      const response = await createTrade(trade)
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
        <Tabs.Trigger value="tab-4">invites</Tabs.Trigger>
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
                <Button onClick={() => handleDeleteOffer(offer._id)}>Delete offer</Button>
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
                <HStack>
                  <Button onClick={() => handleDeleteOffer(offer._id)}>refuse offer</Button>
                  <Link to={"/trade/"+offer.sender}><Button>Counter offer</Button></Link>
                  <Button onClick={() =>{
                    handleAcceptOffer(offer)
                    handleDeleteOffer(offer._id)
                    }}>Accept offer</Button>
                </HStack>
              </Container> 
              }
        </For>
        </Container>
      </Tabs.Content>
      <Tabs.Content value='tab-4'>
      <Container m={4} p={4} height="dvh">
              <For each={invites}>
                {
                (invite, index) =>
                  <Container key={invite._id}>
                    <InviteCard invite={invite} />
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