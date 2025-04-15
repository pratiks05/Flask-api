import {Container, Stack, Text } from "@chakra-ui/react"
import Navbar from "./components/ui/Navbar"
import UserGrid from "./components/ui/UserGrid"



function App() {
  return (
    <Stack minH={"100vh"}>
      <Navbar/>
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
          My Besties {" 🚀"}
        </Text>
        <UserGrid/>
      </Container>
    </Stack>
  )
}

export default App