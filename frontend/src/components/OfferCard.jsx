import { fetchUser } from '@/api/User'
import {  Card, Container, Heading, Stack, For, Box } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import ItemName from './ItemName'

const OfferCard = ({offer}) => {
    const [user,setUser] = useState('')
    useEffect(()=>{
        const fetchData = async () => {
            const reciever = await fetchUser(offer.reciever)
            setUser(reciever)
        }
        fetchData()
    },[])

  return (
    <Container>
        <Card.Root>
            <Card.Header>
        <Heading>
            offer to: {user}
        </Heading>
        </Card.Header>
        <Card.Body>
            item sending:
            <Stack>
                <Box listStyleType="circle">
                <For each={offer.offering} >
                    {(item, index) =>
                    <ItemName key={item} id={item}/>
                    }
                </For>
                </Box>
            </Stack>
            item recieving:
            <Stack>
                <Box listStyleType="circle">
                <For each={offer.wanting} >
                    {(item, index) =>
                    <ItemName key={item} id={item}/>
                    }
                </For>
                </Box>
            </Stack>
        </Card.Body>
        </Card.Root>
    </Container>
  )
}

export default OfferCard