import { Box, Button, Container, Flex, Text, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { HiOutlineUserGroup, HiOutlineUserAdd } from "react-icons/hi";
import CreateUserModal from "./CreateUserModal";

const Navbar = ({ setUsers }) => {
	const { colorMode, toggleColorMode } = useColorMode();
	return (
		<Container maxW={"900px"}>
			<Box 
				px={4} 
				my={4} 
				borderRadius="full" 
				bg={useColorModeValue("gray.200", "gray.700")}
				boxShadow="sm"
			>
				<Flex h='16' alignItems={"center"} justifyContent={"space-between"}>
    {/* Left side */}
    <Flex
        alignItems={"center"}
        justifyContent={"center"}
        gap={3}
        display={{ base: "none", sm: "flex" }}
    >
        <HiOutlineUserGroup size={24} color="#3182CE" />
        <Text 
            fontSize={"xl"} 
            fontWeight="bold" 
            color="blue.500" 
            fontFamily="Poppins, sans-serif"
            letterSpacing="tight"
        >
            Employee Manager
        </Text>
    </Flex>
    {/* Right side */}
    <Flex gap={3} alignItems={"center"}>
        <Text 
            fontSize={"lg"} 
            fontWeight={500} 
            display={{ base: "none", md: "block" }}
            color="blue.400"
            fontFamily="Poppins, sans-serif"
        >
            <Flex alignItems="center" gap={2}>
                <span>Team Dashboard</span>
                <HiOutlineUserGroup size={18} color="#4299E1" />
            </Flex>
        </Text>

        <Button 
            onClick={toggleColorMode} 
            borderRadius="full"
            size="sm"
            colorScheme="blue"
            variant="outline"
        >
            {colorMode === "light" ? <IoMoon /> : <LuSun size={20} />}
        </Button>
        <CreateUserModal setUsers={setUsers} />
    </Flex>
</Flex>
			</Box>
		</Container>
	);
};
export default Navbar;