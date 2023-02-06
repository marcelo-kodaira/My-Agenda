import { Box, Button, Grid, Heading, Text, VStack } from "@chakra-ui/react"
import { FaEnvelope, FaLock } from "react-icons/fa"
import { Input as FormInput } from "../../components/Form"
import {DeepMap, FieldError, FieldValues, UseFormRegister} from "react-hook-form"
import { useHistory } from "react-router-dom"
import { theme } from "../../styles/theme"


interface SignInData {
    email: string,
    senha: string
}

interface LoginFormProps {
    handleSignIn: () => void;
    errors: DeepMap<FieldValues, FieldError>
    register: UseFormRegister<SignInData>
    loading: boolean
}


const LoginForm = ({handleSignIn, errors, register, loading}: LoginFormProps) =>{


    const history = useHistory()


    return(
    <Grid as="form" 
                onSubmit={handleSignIn} 
                w={["100%","100%","100%","60%","45%"]}
                mt={["4","4","0"]} 
                padding="30px 15px" 
                border="3px solid" 
                borderColor="gray.100" 
                bg="white" 
                color="gray.900"
                >
                    <Heading size="lg">Bem vindo de volta!</Heading>
                    <VStack spacing="5" mt="6">
                        <Box w="100%">
                            <FormInput  label="Login" type="email" icon={FaEnvelope} placeholder="Digite seu login" error={errors.email} {...register("email")}/>
                            {!errors.email && <Text ml="1" mt="1" color='gray.300'>Exemplo: nome@email.com</Text>}
                        </Box>
                    </VStack>

                        <FormInput  type="password" icon={FaLock} label="Senha"  placeholder="Digite sua senha" error={errors.senha} {...register("senha")}/>

                    <VStack mt="4" spacing="5">
                        <Button isLoading={loading} bg={theme.colors.blue['800']} w="100%" h="60px" borderRadius="8px" _hover={{background: theme.colors.blue['900']}} color="white" type="submit">Entrar</Button>
                        <Text color="gray.400">Ainda não possui uma conta?</Text>

                        <Button onClick={() => history.push('/signup')}  bg="gray.400" w="100%" h="60px" borderRadius="8px" _hover={{background: 'gray.600'}} color="white" >Cadastrar</Button>
                    </VStack>
                </Grid>
    )
}

export default LoginForm