import {  Center, Flex, Heading, HStack, Modal, ModalBody, ModalCloseButton, ModalContent,  ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import { FaCube, FaEnvelope,  FaPhoneAlt, FaTrash } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import { useContacts} from "../../contexts/ContactsContext";
import { theme } from "../../styles/theme";

interface Contact{
    id: string,
    nome: string,
    email: string,
    telefone: string,
    createdAt: Date,
    updatedAt: Date
}

interface ModalContactDetailsProps {
    isOpen: boolean;
    onClose: () => void;
    contact: Contact
}

const ModalContactDetails = ({ isOpen, onClose, contact}: ModalContactDetailsProps) =>{
    
    const {token} = useAuth()
    const {deleteContact} = useContacts()

    const handleDelete = () =>{
        deleteContact(contact.id,token)
        onClose()
    }
    
    return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent padding="2" bg="white" color="gray.800">
        <ModalHeader display="flex" justifyContent="space-between">
            <Flex>
                <Center bg="green"  w="30px" h="30px" borderRadius="5px">
                    <FaCube color={theme.colors.white}/>
                </Center>
            <Text fontWeight="bold" ml="2">Visualizar</Text>
            </Flex>

            <HStack spacing="2">

                <Center as="button" onClick={handleDelete} w="30px" h="30px" borderWidth="1px" borderRadius="5px" borderColor="gray.200" bgColor="white" mr="10">
                    <FaTrash color={theme.colors.gray['300']} />
                </Center>
                
                <Center>
                    <ModalCloseButton bg="green" color="white" _hover={{bg: "red.700"}}/>
                </Center>

            </HStack>

            </ModalHeader>

          <ModalBody>


            <Heading as="h1" fontSize="2xl" mb="4">{contact.nome}</Heading>
            
                <HStack mb="4">
                        <FaPhoneAlt/>
                        <Text>{contact.telefone}</Text>
                    </HStack>

                    <HStack mb="4">
                        <FaEnvelope/>
                        <Text>{contact.email}</Text>
                    </HStack>

          </ModalBody>

        </ModalContent>

      </Modal>
    )
}

export default ModalContactDetails