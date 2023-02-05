import {Box, Skeleton, SkeletonProps } from "@chakra-ui/react";

interface CardSkeletonProps extends SkeletonProps{
    repeatCount: number
}


const CardSkeleton = ({repeatCount = 1,...rest}:CardSkeletonProps) =>{
    const howMany = Array.from(Array(repeatCount).keys())

    return(
        <>
            {
                howMany.map((num) =>(
                    <Skeleton {...rest} speed={1} startColor="gray.100" endColor="gray.200" key={num}>
                        <Box w="420px" h="190px" padding="7"></Box>
                    </Skeleton>
                ))
            }
        </>
    )
}

export default CardSkeleton