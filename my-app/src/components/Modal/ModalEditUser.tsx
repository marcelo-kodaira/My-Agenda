import { Button, Center, Heading, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, VStack } from "@chakra-ui/react";
import {  FaEnvelope, FaLock, FaPenFancy, FaPhone, FaUser} from "react-icons/fa";
import { theme } from "../../styles/theme";
import { Input } from "../Form";
import { useForm} from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup'
import { useAuth } from "../../contexts/AuthContext";
import api from "../../services/api";
import { useCallback } from "react";


interface ModalEditUserProps {
    isOpen: boolean
    onClose: () => void
}


interface EditUserData {
    email?: string,
    nome?: string,
    telefone?: string,
    senha: string,
    confirm_senha?: string
}

const editUserSchema = yup.object().shape({
    email: yup.string().email('Email inválido'),
    senha: yup.string().required("Senha obrigatória"),
    confirm_senha: yup.string().required("Confirmação de senha obrigatória").oneOf([yup.ref('senha')], "As senhas não coincidem."),
    nome: yup.string(),
    telefone: yup.string()
})

const ModalEditUser = ({ isOpen, onClose}: ModalEditUserProps) =>{

  const {formState: {errors}, register, handleSubmit}= useForm<EditUserData>({
    resolver: yupResolver(editUserSchema)
  })

  const {token,user,signOut} = useAuth()
  

  const handleFditUser = (data:EditUserData) => {
    delete data.confirm_senha;

    if(!data.email){
      data.email = user.email
    }
    if(!data.nome){
      data.nome = user.nome
    }
    if(!data.telefone){
      data.telefone = user.telefone
    }
    api.patch("/clients",data,{headers:{Authorization: `Bearer ${token}`}})
    .then(res => {
      const userUpdated = {
        id: res.data.id,
        nome: res.data.nome,
        email: res.data.email,
        telefone: res.data.telefone
      }
      user.nome = res.data.nome
      localStorage.setItem('@MyAgenda:user', JSON.stringify(userUpdated))
      onClose()
    })
    .catch(err => {
        console.log(err)
        onClose()
    })
  }

  const handleDeletetUser = () => {
    api.delete("/clients",{headers:{Authorization: `Bearer ${token}`}})
    .then(res => {
        signOut()
    })
    .catch(err => {
        console.log(err)
        onClose()
    })
  }

  return(
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(handleFditUser)} padding="2" bg="white" color="gray.800">
        <ModalHeader>
            <HStack>
              <Center bg="green"  w="30px" h="30px" borderRadius="5px">
                  <FaPenFancy color={theme.colors.white}/>
              </Center>
              <Heading fontSize="2xl" ml="2">Editar Informações</Heading>
            </HStack>
            <Text mt="4">Preencha  os campos que deseja alterar e insira sua senha atual, ou crie uma nova para confirmar.</Text>
            </ModalHeader>
            <ModalCloseButton bg="purple.500" color="white" _hover={{bg: "red.700"}}/>

          <ModalBody  textAlign="center">

          <VStack  mt="1">

            <Input id="nomeUser"  label="Nome" placeholder={user.nome} icon={FaUser}  error={errors.nome} {...register("nome")}/>

            <Input  label="Email" placeholder={user.email} type="email" icon={FaEnvelope}  error={errors.email} {...register("email")}/>

            <Input  label="Telefone" placeholder={user.telefone}  type="tel" icon={FaPhone}  error={errors.telefone} {...register("telefone")}/>

            <Input  type="password" placeholder="*********" icon={FaLock} label="Senha"   error={errors.senha} {...register("senha")}/>

            <Input  type="password" placeholder="*********" icon={FaLock} label="Confirmação de senha"   error={errors.confirm_senha} {...register("confirm_senha")}/>

            </VStack>

          </ModalBody>

          <ModalFooter flexDir="column">
            <Button type="submit"  bg="green" color="white" w="100%" h="60px" _hover={{bg: "darkgreen"}}>
              Confirmar alterações
            </Button>

            <Button mt="4" type="submit" onClick={handleDeletetUser}   bg="red" color="white" w="100%" h="60px" _hover={{bg: "darkred"}}>
              Deletar conta
            </Button>
            
          </ModalFooter>
        </ModalContent>
      </Modal>
  )
}

export default ModalEditUser