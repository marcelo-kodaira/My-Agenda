import { Box, Button, Center, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, VStack } from "@chakra-ui/react";
import { FaClipboard} from "react-icons/fa";
import { theme } from "../../styles/theme";
import { Input } from "../Form";
import { useForm} from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup'
import { useAuth } from "../../contexts/AuthContext";
import { useTasks } from "../../contexts/TasksContext";


interface ModalCreateTaskProps {
    isOpen: boolean;
    onClose: () => void;
}

interface createTaskData {
  nome: string
  email: string
  telefone: string
}

interface taskData extends createTaskData{
  id: string
  createdAt: Date
  updatedAt: Date
}

const createTaskSchema = yup.object().shape({
  nome: yup.string().required('Campo obrigatório'),
  email: yup.string().required('Campo obrigatório'),
  telefone: yup.string().required('Campo obrigatório').max(15)
})

const ModalCreateTask = ({ isOpen, onClose}: ModalCreateTaskProps) =>{

  const {formState: {errors}, register, handleSubmit}= useForm<taskData>({
    resolver: yupResolver(createTaskSchema)
  })

  const {token,user} = useAuth()
  const {createTask} = useTasks()

  const handleCreateTask = (data:taskData) => {
    createTask(data, token)
    .then(res => onClose())
  }

  return(
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(handleCreateTask)} padding="2" bg="white" color="gray.800">
        <ModalHeader display="flex">
            <Center bg="purple.500"  w="30px" h="30px" borderRadius="5px">
                <FaClipboard color={theme.colors.white}/>
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
              Adicionar Tarefa
            </Button>
            
          </ModalFooter>
        </ModalContent>
      </Modal>
  )
}

export default ModalCreateTask