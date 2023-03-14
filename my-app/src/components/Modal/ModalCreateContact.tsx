import {Button, Center, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, VStack } from "@chakra-ui/react";
import { FaUserPlus} from "react-icons/fa";
import { theme } from "../../styles/theme";
import { Input } from "../Form";
import { useForm} from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup'
import { useAuth } from "../../contexts/AuthContext";
import { useContacts } from "../../contexts/ContactsContext";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from 'react-toastify';


interface ModalCreateContactProps {
    isOpen: boolean;
    onClose: () => void;
}

interface createContactData {
  nome: string
  email: string
  telefone: string
}

interface ContactData extends createContactData{
  id: string
  createdAt: Date
  updatedAt: Date
}

const createContactSchema = yup.object().shape({
  nome: yup.string().required('Campo obrigatório'),
  email: yup.string().required('Campo obrigatório'),
  telefone: yup.string().required('Campo obrigatório').max(15)
})



const ModalCreateContact = ({ isOpen, onClose}: ModalCreateContactProps) =>{

  const {formState: {errors}, register, handleSubmit}= useForm<ContactData>({
    resolver: yupResolver(createContactSchema)
  })

  const {token} = useAuth()
  const {createContact} = useContacts()

  const notify = () => {
    toast.error("Email já cadastrado!");
  }

  const handleCreateContact = (data:ContactData) => {
    createContact(data, token)
    .then(response => {
        onClose()
    }).catch(err => notify())
    
  }

  return(
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(handleCreateContact)} padding="2" bg="white" color="gray.800">
        <ModalHeader display="flex">
            <Center bg="purple.500"  w="30px" h="30px" borderRadius="5px">
                <FaUserPlus color={theme.colors.white}/>
            </Center>
            <Text fontWeight="bold" ml="2">Adicionar</Text>
            </ModalHeader>
            <ModalCloseButton bg="purple.500" color="white" _hover={{bg: "red.700"}}/>

          <ModalBody  textAlign="center">
            <VStack spacing="5" >
              <Input label="Nome" error={errors.nome} {...register('nome')} placeholder="Digite o nome do contato"/>
              <Input label="Email" type='email' error={errors.email} {...register('email')} placeholder="Digite o e-mail do contato"/>
              <Input label="Telefone" type='tel' error={errors.telefone} {...register('telefone')} placeholder="Digite o telefone do contato"/>
            </VStack>
          </ModalBody>

          <ModalFooter flexDir="column">
            <Button type="submit"  bg="purple.500" color="white" w="100%" h="60px" _hover={{bg: "purple.600"}}>
              Adicionar Contato
            </Button>
            
          </ModalFooter>
        </ModalContent>
        <ToastContainer />
      </Modal>
  )
}

export default ModalCreateContact
