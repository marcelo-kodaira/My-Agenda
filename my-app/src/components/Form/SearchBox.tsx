import { Button, Center, Flex, useDisclosure } from "@chakra-ui/react"
import { FaSearch } from "react-icons/fa"
import { Input } from "."
import { theme } from "../../styles/theme"
import ModalCreateTask from "../Modal/ModalCreateTask"
import {useForm} from "react-hook-form"
import { useTasks } from "../../contexts/TasksContext"
import { useAuth } from "../../contexts/AuthContext"

interface SearchData{
    nome: string
}

const SearchBox = () =>{
    const {isOpen, onClose, onOpen} = useDisclosure()
    const {token} = useAuth()
    const { searchTask } = useTasks()

    const handleSearch = ({nome}:SearchData) => {
        searchTask(nome,token)
    }

    const {register, handleSubmit} = useForm<SearchData>()

    return(
        <>
            <ModalCreateTask isOpen={isOpen} onClose={onClose}/>
            <Flex mt="6" w="100%" paddingX={['4','8']} paddingY="2" paddingBottom="6" borderBottomWidth="1px" borderColor="gray.50" flexDir={["column","column","row","row"]}>
                <Flex as="form" onSubmit={handleSubmit(handleSearch)}>
                    <Input placeholder="Pesquisar por tarefa"  w={["100%","100%","35vw"]} h="60px"  {...register("nome")}/>
                    <Center as="button" borderRadius="8px" ml="2" w="65px" h="60px" fontSize="2xl" bg="purple.600">
                        <FaSearch color={theme.colors.white}/>
                    </Center>
                </Flex>
                <Button onClick={onOpen} bg="purple.500" color="white" paddingX="16" mt={["4","4","0","0"]} ml={["0","0","4"]} h="60px" borderRadius="8px" _hover={{bg: 'purple.600'}}>Adicionar uma nova tarefa</Button>
            </Flex>
        </>
    )
}

export default SearchBox