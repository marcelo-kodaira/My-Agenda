import { createContext, useContext, useCallback, useState, ReactNode } from 'react'
import api from '../services/api'



interface AuthProviderProps {
    children: ReactNode
}

interface User{
    id: string,
    nome: string,
    email:string,
    telefone: string
}

interface signInCredentials{
    email: string,
    senha: string
}

interface AuthState {
    token: string,
    user: User
}

interface AuthContextData {
    user: User,
    token: string,
    signIn: (credentials: signInCredentials) => Promise<void>
    signOut: ()=> void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const useAuth = () =>{
    const context = useContext(AuthContext)

    if(!context){
        throw new Error('useAuth must be used within an AuthProvider')
    }

    return context
}

const AuthProvider = ({children}: AuthProviderProps) =>{


    const [data, setData] = useState<AuthState>(() => {
        const token = localStorage.getItem('@MyAgenda:token')
        const user = localStorage.getItem('@MyAgenda:user')

        if(token && user){
            return {token, user: JSON.parse(user)}
        }

        return {} as AuthState
    })

    const signIn = useCallback(async ({email, senha}:signInCredentials) =>{
        const response = await api.post('/clients/login',{
            email,
            senha
        })
        const {token,user} = response.data

        localStorage.setItem('@MyAgenda:token', token)
        localStorage.setItem('@MyAgenda:user', JSON.stringify(user))

        setData({token, user})
    },[])

    const signOut = useCallback(() =>{
        localStorage.removeItem('@MyAgenda:token')
        localStorage.removeItem('@MyAgenda:user')

        setData({} as AuthState)
    },[])


    return(
        <AuthContext.Provider value={{
            signIn,
            signOut,
            token: data.token,
            user: data.user
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthProvider, useAuth}

