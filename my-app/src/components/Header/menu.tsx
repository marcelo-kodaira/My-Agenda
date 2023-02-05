import { Box, Center, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Heading, Text, useDisclosure } from "@chakra-ui/react"
import { useAuth } from "../../contexts/AuthContext"
import {FiLogOut, FiSettings} from 'react-icons/fi'
import { theme } from "../../styles/theme"
import ModalEditUser from "../Modal/ModalEditUser"

interface MenuProps{
    isOpen: boolean,
    onClose: ()=> void,
}


const Menu = ({isOpen, onClose}: MenuProps) =>{
    const {isOpen: isModalEditUserOpen, onOpen: onModalEditUserOpen, onClose: onModalEditUserClose} = useDisclosure()

    const {user,signOut} = useAuth()

    return(
        <>
            <ModalEditUser isOpen={isModalEditUserOpen} onClose={onModalEditUserClose}/>
            <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay mt={["13vh","8vh"]} />
                <DrawerContent ml="auto" mt="80px" w={["450px","350px"]}>
                <DrawerHeader borderBottomWidth='1px' borderColor="gray.50" color="gray.400" >Olá, {user.nome}!</DrawerHeader>
                <DrawerBody>


                <Flex  onClick={onModalEditUserOpen} _hover={{cursor: 'pointer'}}>

                    <Center w="60px" h="60px" bg="orange" mb="6" fontSize="2xl" borderRadius="md">
                        <FiSettings color={theme.colors.white}/>
                    </Center>
                    <Box ml="4" paddingTop="2">
                    <Heading as="h2" fontSize="lg">
                        Alterar dados
                    </Heading>
                    <Text color="gray.400" fontSize="small">
                        Alterar dados da minha conta
                    </Text>
                    </Box>

                </Flex> 

                    <Flex  onClick={signOut} _hover={{cursor: 'pointer'}}>
                    <Center w="60px" h="60px" bg="red.600" fontSize="2xl" borderRadius="md">
                            <FiLogOut color={theme.colors.white}/>
                        </Center>
                        <Box ml="4" paddingTop="2">
                            <Heading as="h2" fontSize="lg">
                                Sair da minha conta
                            </Heading>
                            <Text color="gray.400" fontSize="small">
                                Sair da minha conta agora
                            </Text>
                        </Box>
                    </Flex> 

                    

                    
                </DrawerBody>
            </DrawerContent>
        </Drawer>
      </>
    )
}

export default Menu