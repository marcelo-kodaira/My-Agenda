import { Center } from "@chakra-ui/react"
import { FaArrowLeft } from "react-icons/fa"
import { useHistory } from "react-router-dom"
import { theme } from "../../styles/theme"

interface GoBackButtonProps{
    top: string,
    left: string
}

const GoBackButton = ({top, left}: GoBackButtonProps) =>{

    const history = useHistory()

    return (
        <Center as="button" position="absolute" top={top} left={left} w={["60px","80px"]} h="60px" backgroundColor="purple.500" fontSize="2xl" borderRadius="md" _hover={{
            bg: "purple.600"
        }} onClick={()=>history.push("/")}> 
            <FaArrowLeft color={theme.colors.white}/>
        </Center>
    )
}

export default GoBackButton