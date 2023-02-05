import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react"
import { useHistory } from "react-router-dom"
import Error404 from "../../assets/error404.svg"

const PageNotFound = () => {

    const history = useHistory()

    return(
        <Flex
        padding={["10px 15px", "10px 15px", "0px", "0px"]} 
        align="center"
        justifyContent="space-evenly" 
        height={['auto', 'auto', '100vh', '100vh']}
        flexDir={["column-reverse","column-reverse","row","row"]} 
        >
            <Box mt="4">
                <Heading>Ooopss...</Heading>
                <Text mt="4">
                    Não encontramos a página que você encontrou, <br/>
                    <b>vamos tentar novamente</b>
                </Text>
                <Button onClick={()=> history.push("/")} mt="4" bg="red.600" h="60px" color="white" w="100%" _hover={{bg: "red.700"}}>Ir para as minhas tarefas</Button>
            </Box>
            <Image src={Error404} />
        </Flex>
    )
}

export default PageNotFound