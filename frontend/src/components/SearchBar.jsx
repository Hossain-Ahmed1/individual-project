import React, { useState } from 'react'
import { Input, Button, Group } from "@chakra-ui/react"
import { LuSearch } from "react-icons/lu"
import { useNavigate } from 'react-router-dom'

const SearchBar = () => {
    const [search,setSearch] = useState('')
    const navigate = useNavigate()
    const searchItems = () => {
        navigate(`/search/${search}`)
    }

  return (
    <Group attached w="full" px={4}>
      <Input onKeyUp={(e) => (e.key == 'Enter') && searchItems()} onChange={(e) => setSearch(e.target.value)} flex="1" placeholder="Search" />
      <Button onClick={searchItems} bg="bg.subtle" variant="outline">
        <LuSearch/>
      </Button>
    </Group>
  )
}

export default SearchBar