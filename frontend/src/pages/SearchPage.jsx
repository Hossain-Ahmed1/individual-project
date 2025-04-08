import React from 'react'
import { useParams } from "react-router"
import { useEffect,useState } from 'react'
import { fetchItems } from '../api/Item'
import { Container, Text, For, Spinner} from '@chakra-ui/react'
import ItemCard from '../components/ItemCard'

const SearchPage = () => {
    const params = useParams()
    const search = params.item
    const [items, setItems] = useState([])
    const [results,setResults] = useState(0)
    useEffect(() => {
        async function fetchData() {
          const data = await fetchItems()
          setItems(data.filter((item) => !(item.name.toLowerCase().indexOf(search.toLowerCase()) === -1)))
        }

        fetchData()
      },[items])

  return (
    
    <Container>
        <Text>
            Search results for: {search}
        </Text>
        <For each={items} fallback={
            <Text>No results</Text>
            }>
              {(item, index) => <ItemCard key={item._id} item = {item}/>}
        </For>

    </Container>
  )
}

export default SearchPage