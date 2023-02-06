import { Box, Center, Heading, Skeleton, Stack, Text } from "@chakra-ui/react"
import SearchBox from "../../components/Form/SearchBox"
import Header from "../../components/Header"
import ModalContactDetails from "../../components/Modal/ModalContactDetails"

interface Contact{
    id: string,
    nome: string,
    email: string,
    telefone: string,
    createdAt: Date,
    updatedAt: Date
}

interface NotFoundProps{
    isContactDetailsOpen: boolean
    onContactDetailsClose: () => void
    selectedContact: Contact
    contactNotFound: string
}

const NotFound = ({isContactDetailsOpen,onContactDetailsClose,selectedContact,contactNotFound}:NotFoundProps) =>{


    return(
        <>
            <ModalContactDetails isOpen={isContactDetailsOpen} onClose={onContactDetailsClose} contact={selectedContact}/>
            <Box>
                <Header/>
                <SearchBox/>
                <Center mt="4"  textAlign="center" display="flex" flexDir="column">
                    <Heading size="lg">Não encontramos resultados para:</Heading>
                    <Text fontSize="xl" color="gray.300" fontWeight="bold">{contactNotFound}</Text>
                    <Box w={["80%","40%"]} mt="6" padding="6" boxShadow="base" bg="white" >
                        <Stack>
                            <Skeleton w="80%" h="20px" startColor="gray.100" endColor="gray.200" borderRadius="20px"/>
                            <Skeleton w="60%" h="20px" startColor="gray.100" endColor="gray.200" borderRadius="20px"/>
                        </Stack>

                        <Stack mt="8">
                            <Skeleton h="15px" startColor="gray.100" endColor="gray.200" borderRadius="20px"/>
                            <Skeleton h="15px" startColor="gray.100" endColor="gray.200" borderRadius="20px"/>
                        </Stack>
                    </Box>
                </Center>
            </Box>
        </>
    )
}

export default NotFound