import { Box, Center, Flex, Heading, HStack, Text } from "@chakra-ui/react"
import { FaEdit, FaPhoneAlt, FaTrash, FaEnvelope } from "react-icons/fa"
import { useAuth } from "../../contexts/AuthContext"
import { useTasks } from "../../contexts/TasksContext"
import { theme } from "../../styles/theme"


interface Task{
    id: string
    nome: string
    email: string
    telefone: string
    createdAt: Date
    updatedAt: Date
}

interface CardProps{
    task: Task
    onClickDetails: (task: Task)=> void;
    onClickEdit: (task: Task)=> void;
}


const Card = ({task, onClickDetails, onClickEdit}:CardProps) =>{
    
    const {token} = useAuth()
    const{deleteTask,updateTask} = useTasks()


    const stringCreatedAt = task.updatedAt.toString().slice(0, 10).split('-')
    const data = `${stringCreatedAt[2]} -  ${stringCreatedAt[1]} - ${stringCreatedAt[0]}` 
    
    return(

        <Box 
            cursor="pointer" 
            _hover={{transform: 'translateY(-7px)',borderColor: "gray.100"}}
            transition="border .2s, ease 0s, transform .2s"
            borderWidth="1px"
            borderColor="gray.50"
            boxShadow="base"
            padding="7"
            w={["80vw","auto"]}
        >
            <Flex justify="space-between">
                <Heading as="h2" size="md">{task.nome}</Heading>
                <HStack spacing="4">

                    <Center as="button" onClick={() => deleteTask(task.id,token)} w="30px" h="30px" borderWidth="1px" borderRadius="5px" borderColor="gray.200" bgColor="white">
                        <FaTrash color={theme.colors.gray['300']} />
                    </Center>

                    <Center as="button" onClick={() => onClickEdit(task)} w="30px" h="30px" borderWidth="1px" borderRadius="5px" borderColor="gray.200" bgColor="white">
                        <FaEdit color={theme.colors.gray['300']} />
                    </Center>

                </HStack>
            </Flex>

            <Box onClick={() => onClickDetails(task)} w="100%" mt="4">
                    <HStack mb="4">
                        <FaPhoneAlt/>
                        <Text>{task.telefone}</Text>
                    </HStack>

                    <HStack mb="4">
                        <FaEnvelope/>
                        <Text>{task.email}</Text>
                    </HStack>
                {/* <Progress colorScheme="purple" mt="2.5" value={10}/> */}
                <Text color="gray.500" mt="3">Criado em: {data}</Text>
            </Box>
        </Box>
    )
}

export default Card