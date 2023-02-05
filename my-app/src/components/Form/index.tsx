import { FormControl, FormErrorMessage, FormLabel, Input as ChakraInput, InputProps as ChakraInputProps, InputLeftElement, InputGroup } from "@chakra-ui/react";
import { useState, useEffect, useCallback, ForwardRefRenderFunction, forwardRef } from "react";
import { FieldError } from "react-hook-form";
import { IconType } from "react-icons";

interface InputProps extends ChakraInputProps{
    name: string,
    label?: string,
    error?: FieldError | null,
    icon?: IconType
}

type inputVariationOptions = {
    [key:string] : string
}

const InputVariation:inputVariationOptions = {
    default: 'gray.200',
    erro: 'red.500',
    focus: 'purple.800',
    filled: 'green.500'
}

export const InputBase: ForwardRefRenderFunction<HTMLInputElement , InputProps> = ({name,error = null,icon: Icon,label,...rest},ref) =>{

    const [variation, setVariation] = useState('default')
    const [value, setValue] = useState('')

    useEffect(() =>{
        if(error){
            return setVariation('error')
        }
    },[error])

    const handleInputFocus = useCallback(() =>{
        if(!error){
            setVariation('focus')
        }
    },[error])

    const handleInputBlur = useCallback(() =>{
        if(value.length > 1 && !error){
            return setVariation('filled')
        }
    },[error,value])

    return(
        <FormControl isInvalid={!!error}>
            {!!label && <FormLabel color="gray.400">{label}</FormLabel>}

            <InputGroup flexDir="column">
                {Icon && (
                <InputLeftElement color={InputVariation[variation]} >
                    <Icon/>
                </InputLeftElement>
                )}
                <ChakraInput
                id={name}
                name={name}
                size='md' 
                h='45px' 
                bg="gray.50" 
                color={InputVariation[variation]} 
                borderColor={InputVariation[variation]}  
                onFocus={handleInputFocus} 
                onBlurCapture={handleInputBlur} 
                onChangeCapture={e => setValue(e.currentTarget.value)} 
                variant="outline" 
                _hover={{ bgColor: 'gray.100'}} 
                _placeholder={{color: 'gray.300'}}
                _focus={{
                    bg: "gray.100"  
                }}
                 
                ref={ref} 
                {...rest}
                />
                {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
            </InputGroup>
        </FormControl>
    )
}

export const Input = forwardRef(InputBase)