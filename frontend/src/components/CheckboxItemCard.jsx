import React, { useState } from 'react'
import { CheckboxCard } from '@chakra-ui/react'
const CheckboxItemCard = ({item,chosenItems,setChosenItem}) => {
    const [checked, setChecked] = useState(false)//controls the state of the check 
    //adds the item to list of chosen items when checked, removed if not checked
    const addToArr = ()=>{
        if (!checked){setChosenItem([...chosenItems,item._id])}else{setChosenItem(chosenItems.filter(citem => citem !== item._id))}
      }
  return (
    <>
<CheckboxCard.Root
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

export default CheckboxItemCard