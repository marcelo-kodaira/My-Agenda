import { Box, Button, Center, Heading, Text, useDisclosure } from "@chakra-ui/react"
import { FaClipboard } from "react-icons/fa"
import Header from "../../components/Header"
import ModalCreateTask from "../../components/Modal/ModalCreateTask"

const FirstTask = () =>{
    
    const {isOpen: isCreateTaskOpen , onOpen: onCreateTaskOpen, onClose: onCreateTaskClose} = useDisclosure()

    return(
        <>
            <ModalCreateTask isOpen={isCreateTaskOpen} onClose={onCreateTaskClose}/>
            <Header/>
            <Box 
            w="90vw" 
            paddingY="16"
            paddingX={["6","0"]} 
            ml="5vw" 
            justifyContent="center" 
            textAlign="center" 
            borderWidth="2px" 
            borderColor="gray.200" 
            borderStyle="dashed"
            >
                <Center fontSize="5xl">
                    <FaClipboard color="#bdbdbd"></FaClipboard>
                </Center>
                <Heading as="h1" fontSize="4xl" mt="4" >Vamos criar sua primeira tarefa!</Heading>
                <Text color="gray.400" mt="6">
                    Insira sua meta e mostre<br/>
                    sua capacidade em cumprir <b>suas atividades</b>
                </Text>
                <Button 
                padding="6" 
                mt="6" 
                bgColor="purple.800" 
                color="white" 
                _hover={{bg: "purple.900"}} 
                onClick={onCreateTaskOpen}
                >
                    Criar sua primeira tarefa
                </Button>
            </Box>
        </>
    )
}
export default FirstTask