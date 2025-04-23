import { 
	Avatar, 
	Box, 
	Card, 
	CardBody, 
	CardHeader, 
	Flex, 
	Heading, 
	IconButton, 
	Text, 
	useToast, 
	useColorModeValue,
	Badge,
	Tooltip
  } from "@chakra-ui/react";
  import { BiTrash } from "react-icons/bi";
  import { motion } from "framer-motion";
  import EditModal from "./EditModal";
  import { BASE_URL } from "../../App";
  
  const MotionCard = motion(Card);
  
  const UserCard = ({ user, setUsers }) => {
	const toast = useToast();
	
	// Dynamic color values based on theme
	const cardBg = useColorModeValue("white", "gray.800");
	const cardHoverBg = useColorModeValue("gray.50", "gray.700");
	const cardShadow = useColorModeValue(
	  "0 4px 6px rgba(160, 174, 192, 0.6)",
	  "0 4px 6px rgba(9, 17, 28, 0.9)"
	);
	const cardHoverShadow = useColorModeValue(
	  "0 8px 12px rgba(160, 174, 192, 0.8)",
	  "0 8px 12px rgba(9, 17, 28, 1)"
	);
	const borderGlow = useColorModeValue(
	  "0 0 15px rgba(66, 153, 225, 0.5)",
	  "0 0 15px rgba(99, 179, 237, 0.5)"
	);
  
	// Role-based badge colors
	const getBadgeColor = (role) => {
	  const roles = {
		"Developer": "blue",
		"Designer": "purple",
		"Manager": "green",
		"Admin": "red"
	  };
	  return roles[role] || "gray";
	};
  
	const handleDeleteUser = async () => {
	  try {
		const res = await fetch(BASE_URL + "/friends/" + user.id, {
		  method: "DELETE",
		});
		const data = await res.json();
		if (!res.ok) {
		  throw new Error(data.error);
		}
		setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
		toast({
		  status: "success",
		  title: "Success",
		  description: "User deleted successfully",
		  duration: 2000,
		  isClosable: true,
		  position: "top-center",
		});
	  } catch (error) {
		toast({
		  status: "error",
		  title: "An error occurred",
		  description: error.message,
		  duration: 4000,
		  isClosable: true,
		});
	  }
	};
	
	return (
	  <MotionCard
		whileHover={{ 
		  y: -5,
		  transition: { duration: 0.2 }
		}}
		bg={cardBg}
		boxShadow={cardShadow}
		borderRadius="lg"
		overflow="hidden"
		transition="all 0.3s ease"
		position="relative"
		_before={{
		  content: '""',
		  position: "absolute",
		  top: 0,
		  left: 0,
		  right: 0,
		  height: "4px",
		  background: "linear-gradient(90deg, #63B3ED, #4299E1, #3182CE)",
		  opacity: 0.7
		}}
		_hover={{
		  boxShadow: `${cardHoverShadow}, ${borderGlow}`,
		  transform: "translateY(-5px)",
		  bg: cardHoverBg
		}}
	  >
		<CardHeader>
		  <Flex gap={4}>
			<Flex flex="1" gap="4" alignItems="center">
			  <Avatar 
				src={user.imgUrl} 
				size="md" 
				borderWidth="2px" 
				borderColor="blue.400"
				transition="all 0.3s ease"
				_hover={{ 
				  transform: "scale(1.05)", 
				  boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.6)" 
				}}
			  />
  
			  <Box>
				<Heading size="sm" mb={1}>{user.name}</Heading>
				<Badge 
				  colorScheme={getBadgeColor(user.role)} 
				  borderRadius="full" 
				  px={2}
				  variant="subtle"
				>
				  {user.role}
				</Badge>
			  </Box>
			</Flex>
  
			<Flex gap={2}>
			  <EditModal user={user} setUsers={setUsers} />
			  
			  <Tooltip label="Delete user" placement="top" hasArrow>
				<IconButton
				  variant="ghost"
				  colorScheme="red"
				  size="sm"
				  aria-label="Delete user"
				  icon={<BiTrash size={20} />}
				  onClick={handleDeleteUser}
				  transition="all 0.2s"
				  _hover={{ 
					bg: "red.100", 
					color: "red.600",
					transform: "scale(1.1)" 
				  }}
				/>
			  </Tooltip>
			</Flex>
		  </Flex>
		</CardHeader>
  
		<CardBody pt={0}>
		  <Text 
			fontSize="sm" 
			lineHeight="1.6"
			opacity={0.9}
			borderTop="1px solid"
			borderColor={useColorModeValue("gray.100", "gray.700")}
			pt={3}
			mt={1}
		  >
			{user.description}
		  </Text>
		</CardBody>
	  </MotionCard>
	);
  };
  
  export default UserCard;