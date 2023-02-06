import { Box,Grid } from "@chakra-ui/react"
import Card from "../../components/Card"
import SearchBox from "../../components/Form/SearchBox"
import Header from "../../components/Header"
import CardSkeleton from "../../components/Skeleton/CardSkeleton"

interface Contact{
    id: string,
    nome: string,
    email: string,
    telefone: string,
    createdAt: Date,
    updatedAt: Date
}

interface ContactListProps{
    loading: boolean
    contacts: Contact[]
    handleClickDetails: (contact: Contact) => void
    handleClickEdit: (contact: Contact) => void
}

const ContactList = ({handleClickDetails,loading,contacts, handleClickEdit}:ContactListProps) =>(
    <Box>
                <Header/>
                <SearchBox/>
                <Grid w="100%" templateColumns="repeat(auto-fill, minmax(420px, 1fr))" gap={10} paddingX="8px" mt="8">
                {
                    loading? (
                    <CardSkeleton repeatCount={9} />
                    ):
                    contacts.map(contact => <Card onClickDetails={handleClickDetails} onClickEdit={handleClickEdit} key={contact.id} contact={contact}/>)
                }
                </Grid>
    </Box>
)

export default ContactList