import { Center, Flex, Heading, Image, useDisclosure } from "@chakra-ui/react"
import { FaTh } from "react-icons/fa"
import Logo from "../../assets/logo-min.svg"
import { theme } from "../../styles/theme"
import Menu from "./menu"

const Header = () =>{

    const {isOpen, onClose, onToggle} = useDisclosure()


    return(
        <Flex borderBottom="1px" borderBottomColor="#f5f5f5" paddingX="8" paddingY="2">
            <Flex align="center">
                <Image src={Logo} alt="pessoas conectadas" boxSize="8"/>
                <Heading ml="4" size="lg">
                    Contatos
                </Heading>
            </Flex>
            <Center as="button" ml="auto" onClick={onToggle} fontSize="2rem">
                <FaTh color={theme.colors.gray['300']}/>
            </Center>
            <Menu isOpen = {isOpen} onClose={onClose}/>
        </Flex>
    )
}

export default Header