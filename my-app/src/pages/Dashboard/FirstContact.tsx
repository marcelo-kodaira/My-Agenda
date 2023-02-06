import { Box, Button, Center, Heading, Text, useDisclosure } from "@chakra-ui/react"
import { FaUserPlus } from "react-icons/fa"
import Header from "../../components/Header"
import ModalCreateContact from "../../components/Modal/ModalCreateContact"
import { theme } from "../../styles/theme"

const FirstContact = () =>{
    
    const {isOpen: isCreateContactOpen , onOpen: onCreateContactOpen, onClose: onCreateContactClose} = useDisclosure()

    return(
        <>
            <ModalCreateContact isOpen={isCreateContactOpen} onClose={onCreateContactClose}/>
            <Header/>
            <Box 
            w="90vw" 
            paddingY="16"
            paddingX={["6","0"]} 
            ml="5vw" 
            justifyContent="center" 
            textAlign="center" 
            borderWidth="2px" 
            borderColor="gray.200" 
            borderStyle="dashed"
            >
                <Center fontSize="5xl">
                    <FaUserPlus color="#bdbdbd"/>
                </Center>
                <Heading as="h1" fontSize="4xl" mt="4" >Vamos criar seu primeiro contato!</Heading>
                <Text color="gray.400" mt="6">
                    Insira seu primeiro contato<br/>
                    e comece a utilizar o My Contacts <b>de forma rápida e fácil</b>
                </Text>
                <Button 
                padding="6" 
                mt="6" 
                bgColor={theme.colors.blue['700']}
                color="white" 
                _hover={{bg: theme.colors.blue['800']}} 
                onClick={onCreateContactOpen}
                >
                    Criar contato
                </Button>
            </Box>
        </>
    )
}
export default FirstContact