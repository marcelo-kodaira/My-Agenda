import { Grid, Heading, Image, Text } from "@chakra-ui/react";
import LogoPrimary from "../../assets/logo-primary.svg"

export const LoginInfo = () =>(
    <Grid 
    w={["100%","100%","50%","40%"]} paddingRight="100px">
        <Image
            src={LogoPrimary} 
            alt="logo My Agenda" 
            boxSize={["120px", "120px", "150px", "150px"]}
            />
        <Heading as="h1" mt="4">
            O jeito fácil, grátis
        </Heading>
        <Text maxW="350px">
            Flexível e atrativo de gerenciar 
            <b> seus contatos em uma única plataforma</b>
        </Text>
    </Grid>
)

export default LoginInfo