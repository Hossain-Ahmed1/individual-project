import React from 'react'
import { Card,Heading,Text } from '@chakra-ui/react'

const itemCard = ({item}) => {

  return (
    <Card.Root size="md">
        <Card.Header>
            <Heading size="md">{item.name}</Heading>
        </Card.Header>
        <Card.Body color="fg.muted">
            quantity {item.quantity}
        </Card.Body>
        <Card.Footer gap="2">
        <Text textStyle="xs">{new Date(item.createdAt).toString().slice(4,15)}</Text>
      </Card.Footer>
    </Card.Root>
  )
}

export default itemCard