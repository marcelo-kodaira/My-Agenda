import { ChakraProvider } from "@chakra-ui/react"
import { ReactNode } from "react"
import { theme } from "../styles/theme"
import { AuthProvider } from "./AuthContext"
import { ContactProvider } from "./ContactsContext"

interface IAppProviderProps {
    children: ReactNode
}

export const AppProvider = ({children}:IAppProviderProps ) =>(

    <AuthProvider>
        <ContactProvider>
            <ChakraProvider theme={theme}>{children}</ChakraProvider>
        </ContactProvider>
    </AuthProvider>
)
