import { Avatar, Box, Card, CardBody, CardHeader, Flex, Heading, IconButton, Text, useToast } from "@chakra-ui/react"
import { BiTrash } from "react-icons/bi";
import EditModal from "./EditModal";
import { BASE_URL } from "../../App";

const UserCard = ({user,setUsers}) => {
	const toast = useToast();
	const handleDeleteUser = async () => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		
		try{
			const res = await fetch(BASE_URL + "/friends/" + user.id, {
				method: "DELETE",
			})
			const data = await res.json();
			if(!res.ok){
				throw new Error(data.error);
			}
			setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id)); // remove user from state
			toast({
				status: "success",
				title: "success",
				description: "User Deleted Successfully",
				duration: 2000,
				isclosable: true,
				position: "top-center",
			});
		}
		catch(error){
			toast({
				status: "error",
				title: "An error occurred.",
				description: error.message,
				duration: 4000,
			});
		}
	}
  return (
    <Card>
            <CardHeader>
				<Flex gap={4}>
					<Flex flex={"1"} gap={"4"} alignItems={"center"}>
						<Avatar src={user.imgUrl}/>

						<Box>
							<Heading size='sm'>{user.name}</Heading>
							<Text>{user.role}</Text>
						</Box>
					</Flex>

					<Flex>
                    <EditModal user={user} setUsers={setUsers} />
						<IconButton
							variant='ghost'
							colorScheme='red'
							size={"sm"}
							aria-label='See menu'
							icon={<BiTrash size={20} />}
							onClick={handleDeleteUser} // Function to delete user
						/>
					</Flex>
				</Flex>
			</CardHeader>

			<CardBody>
				<Text>{user.description}</Text>
			</CardBody>
    </Card>
  )
}

export default UserCard
