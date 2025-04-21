import React, { useState } from 'react'
import { CheckboxCard,Heading,Text,Button } from '@chakra-ui/react'
import {io} from "socket.io-client"

const LiveCheckBoxItemCard = ({item,chosenItems,setChosenItem,socket,room,readonly,user}) => {
    const [checked, setChecked] = useState(false)
    const emitsItems = (items)=>{
        socket.emit('selected items',{
            selected:items,
            room:room
        })
      }
    const addToArr = ()=>{
      if (user){
        if (!checked){
            setChosenItem([...chosenItems,item._id])
            emitsItems([...chosenItems,item._id])
        }
        else{setChosenItem(chosenItems.filter(citem => citem !== item._id))
            emitsItems(chosenItems.filter(citem => citem !== item._id))
        }
      }
    }


    socket.on("sending items",(data)=>{
      if (!user){
        setChosenItem(data)
        setChecked(false)
      for (const sitems of data){
        if (sitems == item._id){
          setChecked(true)
        }
      }
    }
    })
  return (
     <>
    <CheckboxCard.Root
        readOnly={readonly}
        checked={checked}
        onCheckedChange={(e) => {
            setChecked(!!e.checked)
            addToArr()
        }
        }
        
    >
      <CheckboxCard.HiddenInput />
      <CheckboxCard.Control>
        <CheckboxCard.Content>
          <CheckboxCard.Label >{item.name}</CheckboxCard.Label>
          <CheckboxCard.Description >{item.desc}</CheckboxCard.Description>
        </CheckboxCard.Content>
        <CheckboxCard.Indicator />
      </CheckboxCard.Control>
    </CheckboxCard.Root>
    </>
  )
}

export default LiveCheckBoxItemCard