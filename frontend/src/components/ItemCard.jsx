import React, { useEffect } from 'react'
import { Card,Heading,Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const itemCard = ({item}) => {

  return (
    <Card.Root size="md">
        <Card.Header>
            <Heading size="md"><Link to={"/item/"+item._id}>{item.name}</Link></Heading>
        </Card.Header>
        <Card.Body color="fg.muted">
            {item.desc}
        </Card.Body>
        <Card.Footer gap="2">
        <Text textStyle="xs">{new Date(item.createdAt).toString().slice(4,15)}</Text>
      </Card.Footer>
    </Card.Root>
  )
}

export default itemCard