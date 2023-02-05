import { Flex,useDisclosure } from "@chakra-ui/react"
import { useForm, SubmitHandler } from "react-hook-form"
import * as yup from 'yup'
import {yupResolver} from "@hookform/resolvers/yup"
import { useState } from "react"
import { useAuth } from "../../contexts/AuthContext"
import LoginInfo from "./LoginInfo"
import LoginForm from "./LoginForm"
import ModalError from "../../components/Modal/ModalError"

const signInSchema = yup.object().shape({
    email: yup.string().required('Email obrigatório').email('Email inválido'),
    senha: yup.string().required("Senha obrigatória")
})

interface SignInData {
    email: string,
    senha: string
}

const Login = () =>{

    const [loading, setLoading] = useState(false)
    const {signIn} = useAuth()

    const {
        register,
        formState:{ errors },
        handleSubmit
    } = useForm<SignInData>({
        resolver: yupResolver(signInSchema)
    })

    const {isOpen: isModalErrorOpen, onOpen: onModalErrorOpen, onClose: onModalErrorClose} = useDisclosure()

    const handleSignIn: SubmitHandler<SignInData> = (data:SignInData) => {
        setLoading(true)
        signIn(data)
        .then(() => setLoading(false) )
        .catch(err => {
            setLoading(false)
            onModalErrorOpen()
        })
    }

    return(
        <>
        <ModalError 
        isOpen={isModalErrorOpen} 
        onClose={onModalErrorClose} 
        error="Usuário ou senha incorretos."  
        secondaryText="Tente novamente <b>clicando</b> no botão acima."
        />
        <Flex  
        padding={["10px 15px", "10px 15px", "0px", "0px"]} 
        align="center"
        justifyContent="center" 
        h={['auto', 'auto', '100vh', '100vh']} 
        bgGradient={[
            "linear(to-b, purple.800 35%, white 65%)",
            "linear(to-b, purple.800 35%, white 65%)",
            "linear(to-r, purple.800 65%, white 35%)",
            "linear(to-tr, #1c15ac 55%, white 35%)"
        ]} 
        color="white"
        >

            <Flex
            w={["100%","100%","90%","60%"]} 
            justifyContent="center" 
            flexDirection={["column","column","row","row"]} 
            alignItems="center"
            >
                <LoginInfo/>
                <LoginForm errors={errors} handleSignIn={handleSubmit(handleSignIn)} loading={loading} register={register}/>
            </Flex>
        </Flex>
    </>
    )
}

export default Login