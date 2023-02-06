import { Grid, Heading, Image, Text } from "@chakra-ui/react";
import LogoPrimary from "../../assets/logo1.svg"

export const LoginInfo = () =>(
    <Grid 
    w={["100%","100%","90%","60%"]}  textAlign="center">
        <Image
            src={LogoPrimary} 
            alt="logo My Agenda" 
            boxSize={["350px", "250px", "270px", "300px", "420px"]}
            margin="0 auto"

            />
        <Heading as="h1" mt="">
            O jeito fácil, grátis
        </Heading>
        <Text >
            Flexível e atrativo de gerenciar 
            <b> seus contatos em uma única plataforma</b>
        </Text>
    </Grid>
)

export default LoginInfo