import { AxiosResponse } from "axios";
import { createContext, ReactNode, useCallback, useContext, useState } from "react";
import api from "../services/api";

interface ContactProviderProps{
    children: ReactNode
}

interface ContactRequest{
    nome: string
    telefone: string
    email: string
}

interface ContactResponse extends ContactRequest{
    id: string
    createdAt: Date
    updatedAt: Date
}

interface ContactPatch{
    name?: string,
    email?: string,
    telefone?: string
}

type CreateContactResponse = { error?: string };


interface ContactContextData{
    contacts: ContactResponse[]
    notFound: boolean
    contactNotFound: string
    createContact: (data:ContactRequest, token: string) => Promise<CreateContactResponse | void>
    loadContacts: (token: string) => Promise<void>
    deleteContact: (contactId:string ,token: string) => Promise<void>
    updateContact: (data:ContactPatch, contactId: string, token:string) => Promise<void>
    searchContact: (nome: string, token: string) => Promise<void>
}

const ContactContext = createContext<ContactContextData>({} as ContactContextData)

const useContacts = () =>{
    const context = useContext(ContactContext)

    if(!context){
        throw new Error('useContacts must be used within an ContactProvider')
    }
    return context
}

const ContactProvider = ({children}:ContactProviderProps) =>{
    const [contacts, setContacts] = useState<ContactResponse[]>([])
    const [notFound, setNotFound] = useState(false)
    const [contactNotFound, setContactNotFound] = useState("")

    const loadContacts = useCallback(async (token:string) =>{
    // const [pagination, setPagination] = useState({})
        try{
            const response = await api.get('/clients/contacts',{
                
                headers: {
                    Authorization: `Bearer ${token}`
                }
            },)
            setContacts(response.data.data)
            //fazer paginação setPagination(response.data.info)
        }catch(err){
            console.log(err)
        }
    },[])

    const createContact = useCallback(async (data:ContactRequest,token:string) =>{
        
       await api.post('/contacts',data, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .then((response: AxiosResponse<ContactResponse>) => {
            setContacts((oldContacts) => [...oldContacts, response.data]);
            return response;
          });
        
    },[])

    const deleteContact = useCallback(async (contactId: string, token:string)=>{
       await api.delete(`/contacts/${contactId}`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .then(_ => {
            const filteredContacts = contacts.filter(contact => contact.id !== contactId)
            setContacts(filteredContacts)
        })
        .catch(err => console.log(err)) 
    },[contacts])

    const updateContact = useCallback(async(data: ContactPatch, contactId: string, token: string) =>{
       await api.patch(`contacts/${contactId}`,data,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            const filteredContacts = contacts.filter(contact => contact.id !== contactId)
            let contact = contacts.find(contact => contact.id === contactId)

            if(contact){
                Object.assign(contact, res.data);
                setContacts([...filteredContacts, contact])
                // setContacts([...filteredContacts, { ...contact, ...res.data }]);
            }
        })
        .catch(err => console.log(err))
    },[contacts])

    const searchContact = useCallback(async(nome: string, token: string) =>{
        api.get('/clients/contacts',{
            headers:{
                Authorization: `Bearer ${token}`}
            }).then(res => {
                const itens = res.data.data
                const filteredItens = itens.filter((contact:ContactResponse) =>{
                    const regex = new RegExp(nome, 'i');
                    return regex.test(contact.nome);
                 })

                if(nome === ""){
                    setContacts(itens)
                    return setNotFound(false)
                }

                if(filteredItens.length === 0){
                    setContactNotFound(nome)
                    return setNotFound(true)
                }
                    setNotFound(false)
                    setContacts(filteredItens)
                
            })
    },[contacts])


    return(
        <ContactContext.Provider value={{
            contacts,
            notFound,
            contactNotFound,
            createContact,
            loadContacts,
            deleteContact,
            updateContact,
            searchContact
            }}>
            {children}
        </ContactContext.Provider>
    )
}

export {useContacts, ContactProvider}