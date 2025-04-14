import { fetchItem } from '@/api/Item'
import { fetchUser } from '@/api/User'
import { Button, Card, Container } from '@chakra-ui/react'
import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const ItemPage = () => {
    const param = useParams()
    const [item,setItem] = useState({})
    const [user,setUser] = useState("")
    const [session,setSession] = useState(0)
    useEffect(() =>{
        const fetchData = async()=>{
            const response = await fetchItem(param.id)
            if(response.status === 200){
                setItem(response.data.data)
                const userResponse = await fetchUser(response.data.data.owner)
                setUser(userResponse)
            }
            if(response.data.data.owner === jwtDecode(sessionStorage.getItem("User")).id){
                setSession(!session)
            }
             
        }
        fetchData()
    },[])
  return (
    <Container>
        <Card.Root>
            <Card.Header>
                {item.name}
            </Card.Header>
            <Card.Body>
                {item.desc}
            </Card.Body>
            <Card.Footer>
                uploaded at: {new Date(item.createdAt).toString().slice(4,15)} | uploaded by: <Link to={"/user/" + item.owner}>{user}</Link>
            </Card.Footer>
        </Card.Root>
        {!session?<Button>trade with user</Button>:<></>}
    </Container>
  )
}

export default ItemPage