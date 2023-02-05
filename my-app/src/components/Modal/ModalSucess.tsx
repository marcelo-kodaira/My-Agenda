import { Box, Button, Center, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import { FaExclamation } from "react-icons/fa";
import { theme } from "../../styles/theme";

interface ModalSucessProps {
    isOpen: boolean;
    onClose: () => void;
    message: string;
    buttonMessage: string,
    onClick: ()=> void;
    secondaryText: string
}

const ModalSucess = ({ isOpen, onClose, buttonMessage, message, onClick, secondaryText}: ModalSucessProps) =>(

    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent padding="2" bg="white" color="gray.800">
        <ModalHeader display="flex">
            <Center bg="green"  w="30px" h="30px" borderRadius="5px">
                <FaExclamation color={theme.colors.white}/>
            </Center>
            <Text fontWeight="bold" ml="2">Yeeeess!!</Text>
            </ModalHeader>
            <ModalCloseButton bg="green" color="white" _hover={{bg: "red.700"}}/>

          <ModalBody textAlign="center">
            <Text>
            <Box dangerouslySetInnerHTML={{
                    __html: message,
                }}/>
            </Text>
          </ModalBody>

          <ModalFooter flexDir="column">
            <Button  bg="purple.500" color="white" w="100%" h="60px" onClick={onClick} _hover={{bg: "purple.600"}}>
              {buttonMessage}
            </Button>
            <Text textAlign="center" mt="4">
                <Box dangerouslySetInnerHTML={{
                    __html: secondaryText,
                }}/>
            </Text>
          </ModalFooter>
        </ModalContent>
      </Modal>
)

export default ModalSucess