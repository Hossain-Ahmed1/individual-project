import React, { useEffect,useState } from 'react'
import { fetchItems } from '../api/Item'
import { Container,Stack,For, Spinner } from '@chakra-ui/react'
import ItemCard from '../components/ItemCard'

const HomePage = () => {
  const [items, setItems] = useState([])
  useEffect(() => {
    async function fetchData() {
      const data = await fetchItems()
      
      console.log(data)
      setItems(data)
    }
    fetchData()

  },[])
  return (
    <Container>
      <Stack>
      <For each={items} fallback={<Spinner/>}>
      {(item, index) => <ItemCard key={item._id} item = {item}/>}
    </For>
      </Stack>
    </Container>

  )
}

export default HomePage