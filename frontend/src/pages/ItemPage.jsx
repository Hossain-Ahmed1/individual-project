import { fetchItem } from '@/api/Item'
import { fetchUser } from '@/api/User'
import { Card, Container } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const ItemPage = () => {
    const param = useParams()
    const [item,setItem] = useState({})
    const [user,setUser] = useState("")
    useEffect(() =>{
        const fetchData = async()=>{
            const response = await fetchItem(param.id)
            if(response.status === 200){
                setItem(response.data.data)
                const userResponse = await fetchUser(response.data.data.owner)
                setUser(userResponse)
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
                uploaded at: {new Date(item.createdAt).toString().slice(4,15)} | uploaded by: {user}
            </Card.Footer>
        </Card.Root>
    </Container>
  )
}

export default ItemPage