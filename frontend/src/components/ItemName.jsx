import { fetchItem } from '@/api/Item'
import React, { useEffect, useState } from 'react'

const ItemName = ({id}) => {
    const [itemname,setItemname] = useState('')
    useEffect(()=>{
        const fetchData = async () => {
            const data = await fetchItem(id)
            setItemname(data.data.data.name)
        }
        fetchData()
    },[])
  return (
    <li>{itemname}</li>
  )
}

export default ItemName