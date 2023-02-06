import {  Flex, useBreakpointValue, useDisclosure } from "@chakra-ui/react"
import { useForm, SubmitHandler } from "react-hook-form"
import * as yup from 'yup'
import {yupResolver} from "@hookform/resolvers/yup"
import { useState } from "react"
import SignUpForm from "./SignUpForm"
import SignUpInfo from "./SignUpInfo"
import GoBackButton from "./GoBakcButton"
import api from "../../services/api"
import ModalSucess from "../../components/Modal/ModalSucess"
import ModalError from "../../components/Modal/ModalError"
import { useHistory } from "react-router-dom"
import { theme } from "../../styles/theme"

const signUpSchema = yup.object().shape({
    email: yup.string().required('Email obrigatório').email('Email inválido'),
    senha: yup.string().required("Senha obrigatória"),
    confirm_senha: yup.string().required("Confirmação de senha obrigatória").oneOf([yup.ref('senha')], "As senhas não coincidem."),
    nome: yup.string().required('Nome obrigatório'),
    telefone: yup.string().required('Telefone obrigatório')
})

interface SignUpData {
    email: string,
    senha: string,
    nome: string,
    telefone: string,
    confirm_senha: string
}

const SignUp = () =>{

    const [loading, setLoading] = useState(false)

    const {
        register,
        formState:{ errors },
        handleSubmit
    } = useForm<SignUpData>({
        resolver: yupResolver(signUpSchema)
    })

    const {isOpen: isModalSucessOpen, onOpen: onModalSucessOpen, onClose: onModalSucessClose} = useDisclosure()
    const {isOpen: isModalErrorOpen, onOpen: onModalErrorOpen, onClose: onModalErrorClose} = useDisclosure()

    const handleSingUp: SubmitHandler<SignUpData> = ({nome,telefone,senha,email}:SignUpData) => {
        setLoading(true)
        api.post("/clients",{nome, email, senha, telefone})
        .then(res => {
            console.log(res.data)
            setLoading(false)
            onModalSucessOpen()
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
            onModalErrorOpen()
        })
    }


    const isWideVersion = useBreakpointValue({
        base: false,
        md: true
    })

    const history = useHistory()

    return(
        <>
            <ModalSucess 
            buttonMessage="Ir para o login agora" 
            message="Seu cadastro deu super certo, <b> vamos lá! </b>" 
            onClick={()=> history.push("/")} 
            secondaryText="Você já pode começar criando <b>suas listas</b> de tarefas agora mesmo" 
            isOpen={isModalSucessOpen} 
            onClose={onModalSucessClose} 
            />
            <ModalError 
            isOpen={isModalErrorOpen} 
            onClose={onModalErrorClose} 
            error="Email já está em uso."  
            secondaryText="Tente novamente <b>clicando</b> no botão acima ou aguarde alguns minutos."
            />
            <Flex  
            padding={["10px 15px", "10px 15px", "0px", "0px"]} 
            align="center"
            justifyContent="center" 
            h={['auto', 'auto', '100vh', '100vh']} 
            bgGradient={[
                `linear(to-b, ${theme.colors.blue['800']} 55%, white 35%)`,
                `linear(to-b, ${theme.colors.blue['800']} 55%, white 35%)`,
                `linear(to-bl, ${theme.colors.blue['800']} 55%, white 35%)`,
                `linear(to-bl, ${theme.colors.blue['800']} 55%, white 35%)`
            ]} 
            color="white"
            >
                <Flex
                w={["100%","100%","90%","60%"]} 
                justifyContent="center" 
                flexDirection={["column","column","row","row"]} 
                >
                {
                    isWideVersion ? (
                        <>
                            <GoBackButton top="75" left="55"/>
                            <SignUpForm errors={errors} handleSignUp={handleSubmit(handleSingUp)} loading={loading} register={register}/>
                            <SignUpInfo/>
                        </>
                    ):
                    (
                        <>
                            <GoBackButton top="10" left="75vw"/>
                            <SignUpInfo/>
                            <SignUpForm errors={errors} handleSignUp={handleSubmit(handleSingUp)} loading={loading} register={register}/>
                        </>
                        )
                }
                    

                </Flex>
            </Flex>
        </>
    )
}

export default SignUp