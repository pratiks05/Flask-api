import {Container, Stack, Text } from "@chakra-ui/react"
import Navbar from "./components/ui/Navbar"
import UserGrid from "./components/ui/UserGrid"
import { useState } from "react";

export const BASE_URL="http://127.0.0.1:5000/api";


function App() {
  const [users,setUsers]=useState([]);
  return (
    <Stack minH={"100vh"}>
      <Navbar setUsers={setUsers}/>
      <Container maxW={"1200px"} my={4}>
        <Text
          fontSize={{ base: "3xl", md: "50" }}
          fontWeight={"bold"}
          letterSpacing={"2px"}
          textTransform={"uppercase"}
          textAlign={"center"}
          mb={8}
          color={"cyan.400"}
        >
          <Text
            as={"span"} 
            bgGradient={"linear(to-r, cyan.400, blue.500)"} 
            bgClip={"text"}
          >
      
          </Text>
           All Employee {" 🚀"}
        </Text>
        <UserGrid users={users} setUsers={setUsers}/>
      </Container>
    </Stack>
  )
}

export default App