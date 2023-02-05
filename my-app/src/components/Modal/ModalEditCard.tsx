import {  Button, Center, Heading, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, VStack } from "@chakra-ui/react";
import {  FaPenFancy} from "react-icons/fa";
import { theme } from "../../styles/theme";
import { Input } from "../Form";
import { useForm} from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup'
import { useAuth } from "../../contexts/AuthContext";
import { useTasks } from "../../contexts/TasksContext";


interface Task{
    id: string
    nome: string
    email: string
    telefone: string
    createdAt: Date
    updatedAt: Date
}

interface ModalEditCardProps {
    isOpen: boolean
    onClose: () => void
    task: Task
}

interface editCardData {
  nome: string
  email: string
  telefone: string
}

interface taskData extends editCardData{
  id: string
  createdAt: Date
  updatedAt: Date
}

const editCardSchema = yup.object().shape({
  nome: yup.string(),
  email: yup.string().email(),
  telefone: yup.string()
})

const ModalEditCard = ({ isOpen, onClose, task}: ModalEditCardProps) =>{

  const {formState: {errors}, register, handleSubmit}= useForm<taskData>({
    resolver: yupResolver(editCardSchema)
  })

  const {token} = useAuth()
  const {updateTask} = useTasks()


  const handleeditCard = (data:taskData) => {
    if(!data.email){
      data.email = task.email
    }
    if(!data.nome){
      data.nome = task.nome
    }
    if(!data.telefone){
      data.telefone = task.telefone
    }
    updateTask(data,task.id, token)
    .then(res => {
      onClose()

    })
  }

  return(
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(handleeditCard)} padding="2" bg="white" color="gray.800">
        <ModalHeader>
            <HStack>
              <Center bg="green"  w="30px" h="30px" borderRadius="5px">
                  <FaPenFancy color={theme.colors.white}/>
              </Center>
              <Heading fontSize="2xl" ml="2">Editar</Heading>
            </HStack>
            <Text mt="4">Preencha  os campos que deseja alterar.</Text>
            </ModalHeader>
            <ModalCloseButton bg="purple.500" color="white" _hover={{bg: "red.700"}}/>

          <ModalBody  textAlign="center">
            <VStack spacing="5" >
              <Input autoComplete="false" label="Nome" error={errors.nome}   {...register('nome')} placeholder={task.nome}/>
              <Input label="Email" type='email'  error={errors.email} {...register('email')} placeholder={task.email}/>
              <Input label="Telefone" type='tel'  error={errors.telefone} {...register('telefone')} placeholder={task.telefone}/>
            </VStack>
          </ModalBody>

          <ModalFooter flexDir="column">
            <Button type="submit"  bg="purple.500" color="white" w="100%" h="60px" _hover={{bg: "purple.600"}}>
              Editar tarefa
            </Button>
            
          </ModalFooter>
        </ModalContent>
      </Modal>
  )
}

export default ModalEditCard