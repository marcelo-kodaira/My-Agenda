import { Button, Center, Flex, useDisclosure } from "@chakra-ui/react"
import { FaSearch } from "react-icons/fa"
import { Input } from "."
import { theme } from "../../styles/theme"
import {useForm} from "react-hook-form"
import { useContacts} from "../../contexts/ContactsContext"
import { useAuth } from "../../contexts/AuthContext"
import ModalCreateContact from "../Modal/ModalCreateContact"

interface SearchData{
    nome: string
}

const SearchBox = () =>{
    const {isOpen, onClose, onOpen} = useDisclosure()
    const {token} = useAuth()
    const { searchContact } = useContacts()

    const handleSearch = ({nome}:SearchData) => {
        searchContact(nome,token)
    }

    const {register, handleSubmit} = useForm<SearchData>()

    return(
        <>
            <ModalCreateContact isOpen={isOpen} onClose={onClose}/>
            <Flex mt="6" w="100%" paddingX={['4','8']} paddingY="2" paddingBottom="6" borderBottomWidth="1px" borderColor="gray.50" flexDir={["column","column","row","row"]}>
                <Flex as="form" onSubmit={handleSubmit(handleSearch)}>
                    <Input placeholder="Pesquisar por contato"  w={["100%","100%","35vw"]} h="60px"  {...register("nome")}/>
                    <Center as="button" borderRadius="8px" ml="2" w="65px" h="60px" fontSize="2xl" bg={theme.colors.blue['600']} _hover={{bg: theme.colors.blue['700']}}>
                        <FaSearch color={theme.colors.white}/>
                    </Center>
                </Flex>
                <Button onClick={onOpen}  bg={theme.colors.blue['600']} color="white" paddingX="16" mt={["4","4","0","0"]} ml={["0","0","4"]} h="60px" borderRadius="8px" _hover={{bg: theme.colors.blue['700']}} >Adicionar um novo contato</Button>
            </Flex>
        </>
    )
}

export default SearchBox