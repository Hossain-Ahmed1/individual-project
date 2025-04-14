import { Button, Container, Flex, HStack, Text} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link, Outlet} from 'react-router-dom'
import SearchBar from './SearchBar'
import { LuUser } from 'react-icons/lu'

const Navbar = () => {
    const [session,setSession] = useState(0)
        useEffect(()=>{
          const checkSession = () =>{
            const token = sessionStorage.getItem("User")
            if (token){
                setSession(1)
            }else{
                setSession(0)
            }
          }
          return () => checkSession()
    },[])
  return (
    <>
    <Container maxW={"1140px"} px={4}>
        <Flex
            h={16}
            alignItems={"center"}
            justifyContent={"space-between"}
            flexDir={{
                base:"column",
                sm:"row"
            }}
        >
            <Text
                fontSize={{ base: "22", sm: "28" }}
                fontWeight={"bold"}
                textTransform={"uppercase"}
                textAlign={"center"}
            
            ><Link to={"/"}>Barter App</Link></Text>

            <SearchBar/>

            <HStack spacing={2} alignItem ={"center"}>
                <Link to={"/register"}>
                    <Button>
                        <LuUser fontSize={20}/>
                    </Button>
                </Link>
            </HStack>
        </Flex>
        </Container>
        <Outlet />
        </>
  )
}

export default Navbar