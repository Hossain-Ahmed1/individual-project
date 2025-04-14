import { Button, Container, Tabs, Flex,For } from '@chakra-ui/react'
import React, { useEffect,useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { deleteItem, fetchItems } from '@/api/Item'
import { jwtDecode } from 'jwt-decode'
import ItemCard from '../components/ItemCard'

const ProfilePage = () => {
    const navigate = useNavigate()
    const [items, setItems] = useState([])
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
          console.log(items)
        }
        checkSession()
        fetchData()
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
        <Tabs.Root lazyMount unmountOnExit defaultValue="tab-1">
      <Tabs.List>
      <Flex gap="4" justifyContent="space-between">
        <Tabs.Trigger value="tab-1">My Items</Tabs.Trigger>
        <Tabs.Trigger value="tab-2">Tab 2</Tabs.Trigger>
        <Tabs.Trigger value="tab-3">Tab 3</Tabs.Trigger>
        <Link to={"/add"}>
        <Button marginEnd="auto">Add ITem</Button>
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
        Tab 2: Content 
      </Tabs.Content>
      <Tabs.Content value="tab-3">
        Tab 3: Content 
      </Tabs.Content>
    </Tabs.Root>
        <Button m={8} onClick={handleLogout}>Logout</Button>
    </Container>
  )
}

export default ProfilePage