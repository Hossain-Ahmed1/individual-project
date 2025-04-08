import { Button, Container, Flex, HStack, Text} from '@chakra-ui/react'
import React from 'react'
import { BsMoon, BsPlusSquare, BsSun } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'
import { useColorMode } from './ui/color-mode'

const Navbar = () => {
const {colorMode, toggleColorMode} = useColorMode()

  return (
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
                <Link to={"/create"}>
                    <Button>
                        <BsPlusSquare fontSize={20}/>
                    </Button>
                </Link>

               <Button onClick={toggleColorMode}>
                    {colorMode === "light" ? <BsMoon /> : <BsSun />}
                </Button>
            </HStack>
        </Flex>
        </Container>

  )
}

export default Navbar