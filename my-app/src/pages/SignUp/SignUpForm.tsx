import { Box, Button, Grid, Heading, Text, VStack } from "@chakra-ui/react"
import { FaEnvelope, FaLock, FaPhone, FaUser } from "react-icons/fa"
import { Input as FormInput } from "../../components/Form"
import {DeepMap, FieldError, FieldValues, UseFormRegister} from "react-hook-form"

interface SignUpData {
    email: string,
    senha: string,
    telefone: string,
    nome: string,
    confirm_senha: string
}

interface SignUpFormProps {
    handleSignUp: () => void;
    errors: DeepMap<FieldValues, FieldError>
    register: UseFormRegister<SignUpData>
    loading: boolean
}


const SignUpForm = ({handleSignUp, errors, register, loading}: SignUpFormProps) =>{

    return(
        <Grid as="form" 
        onSubmit={handleSignUp}
        w={["100%","100%","100%","60%","45%"]}
        mt={["4","4","0"]} 
        padding="25px 25px" 
        border="3px solid" 
        borderColor="gray.100" 
        bg="white" 
        color="gray.900"
        >
            <Heading size="lg">Crie sua conta!</Heading>
            
            <VStack  mt="1">
            <FormInput  label="Nome" icon={FaUser} placeholder="Digite seu nome" error={errors.nome} {...register("nome")}/>
                <Box w="100%">
                    <FormInput  label="Email" type="email" icon={FaEnvelope} placeholder="Digite seu email" error={errors.email} {...register("email")}/>
                    {!errors.email && <Text ml="1" mt="1" color='gray.300'>Exemplo: nome@email.com</Text>}
                </Box>
                <FormInput  label="Telefone"  type="tel" icon={FaPhone} placeholder="Digite seu telefone" error={errors.telefone} {...register("telefone")}/>

                <FormInput  type="password" icon={FaLock} label="Senha"  placeholder="Digite sua senha" error={errors.senha} {...register("senha")}/>

                <FormInput  type="password" icon={FaLock} label="Confirmação de senha"  placeholder="Confirme sua senha" error={errors.confirm_senha} {...register("confirm_senha")}/>
            </VStack>


            <Button mt="3" isLoading={loading} bg="purple.800" w="100%" h="60px" borderRadius="8px" _hover={{background: 'purple.900'}} color="white" type="submit">Cadastrar</Button>

        </Grid>
    )
}
export default SignUpForm