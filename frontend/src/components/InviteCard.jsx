import { fetchUser } from '@/api/User'
import { Button, Card,Heading } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


const InviteCard = ({invite}) => {
    const [sender,setSender] = useState('')
    useEffect(()=>{
        const fetchData = async () => {
            const response = await fetchUser(invite.sender)
            setSender(response)
        }
        fetchData()
    })
  return (
    <Card.Root>
       <Card.Header>
            <Heading size="md">invite from: {sender}</Heading>
        </Card.Header>
        <Card.Body color="fg.muted">
            <Link to={"/livetrade/" + invite._id}><Button>Go to live trade</Button></Link>
        </Card.Body>
        <Card.Footer gap="2">
      </Card.Footer> 
    </Card.Root>
  )
}

export default InviteCard