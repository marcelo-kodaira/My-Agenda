import { Box, Center, Flex, Grid, Heading, Image, Text, useBreakpointValue, VStack } from "@chakra-ui/react"
import { FaBookOpen, FaForward, FaUsers, FaUserShield } from "react-icons/fa"
import {theme} from "../../styles/theme"
import logo from "../../assets/logo-med.svg"


const SignUpInfo = () =>{

    const isWideVersion = useBreakpointValue({
        base: false,
        md: true,

    })

    return(

    <Grid 
    w={["100%","100%","36%","38.5%"]} paddingLeft={["10px","10px","40px","100px"]}>
       
            {
            isWideVersion? 
            (
                <>
                    <VStack spacing="14" mt={["10px", "0"]}>

                        <Flex w={["25%","100%"]}>
                            <Center borderRadius="5px" bg="white" w="50px" h="50px">
                                <FaForward color={theme.colors.purple['800']} size={25}/>
                            </Center>
                            <Box ml="4">
                                <Heading size="lg">Agilidade</Heading>
                                <Text>Agilize seus projetos com rapidez <br/> e muita performance</Text>
                            </Box>
                        </Flex>

                        <Flex w="100%">
                            <Center borderRadius="5px" bg="white" w="50px" h="50px">
                                <FaUsers color={theme.colors.purple['800']} size={25}/>
                            </Center>
                            <Box ml="4">
                                <Heading size="lg">Simplicidade</Heading>
                                <Text>Armazene seus contatos em uma <br/> interface altamente usual</Text>
                            </Box>
                        </Flex>

                        <Flex w="100%">
                            <Center borderRadius="5px" bg="white" w="50px" h="50px">
                                <FaUserShield color={theme.colors.purple['800']} size={25}/>
                            </Center>
                            <Box ml="4">
                                <Heading size="lg">Segurança</Heading>
                                <Text>Armazene seus contatos em uma <br/> interface altamente usual</Text>
                            </Box>
                        </Flex>

                    </VStack>
                </>
            ):
            (
                <>
                    
            <Flex justifyContent="flex-end" gap="30px" mt="8">
            <Box borderRadius="5px" bg="white" w="55px" h="50px" margin-left="50px" mb="4">
                    <Center>
                        <Image src={logo}/>
                    </Center>
                </Box>
            </Flex>
                </>
            )
        }
    </Grid>
    )
}

export default SignUpInfo