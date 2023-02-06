import { useDisclosure } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useAuth } from "../../contexts/AuthContext"
import { useContacts} from "../../contexts/ContactsContext"
import NotFound from "./NotFound"
import ModalEditCard from "../../components/Modal/ModalEditContact"
import ModalContactDetails from "../../components/Modal/ModalContactDetails"
import FirstContact from "./FirstContact"
import ContactList from "./ContactsList"

interface Contact{
    id: string,
    nome: string,
    email: string,
    telefone: string,
    createdAt: Date,
    updatedAt: Date
}
const Dashboard = () =>{
    
    const [loading,setLoading] = useState(true)
    const {token} = useAuth()
    const {contacts, loadContacts, notFound, contactNotFound} = useContacts()

    const[selectedContact, setSelectedContact] = useState<Contact>({} as Contact)

    const {isOpen: isContactDetailsOpen , onOpen: onContactDetailsOpen, onClose: onContactDetailsClose} = useDisclosure()

    const {isOpen: isEditContactOpen , onOpen: onEditContactOpen, onClose: onEditContactClose} = useDisclosure()
    

    useEffect(() =>{
        loadContacts(token)
        .then(res => setLoading(false))
    },[])

    const handleClickDetails = (contact:Contact) =>{
        setSelectedContact(contact);
        onContactDetailsOpen()
    }

    const handleClickEdit = (contact:Contact) =>{
        setSelectedContact(contact);
        onEditContactOpen()
    }


    if(notFound){
        return <NotFound isContactDetailsOpen={isContactDetailsOpen} onContactDetailsClose={onContactDetailsClose} selectedContact={selectedContact} contactNotFound={contactNotFound}/>
    }

    return(
        <>
            <ModalContactDetails isOpen={isContactDetailsOpen} onClose={onContactDetailsClose} contact={selectedContact}/>
            <ModalEditCard isOpen={isEditContactOpen} onClose={onEditContactClose} contact={selectedContact}/>
            {
            !contacts.length && !loading ?
            <FirstContact/>
            :   
            <ContactList contacts={contacts} handleClickDetails={handleClickDetails}  handleClickEdit={handleClickEdit} loading={loading} />
            }
        </>
    )
}

export default Dashboard