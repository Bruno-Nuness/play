import Loop from '@/assets/img/Rolling.svg'
import { LoadingContainer } from '@/styles/loading'
import Image from 'next/image'

export const Loading = ()=>{
    return (
    <LoadingContainer>
        <Image src={Loop} alt='carregando...' width={'300px'} height={'300px'}></Image>
        <h1>Carregando... </h1>
    </LoadingContainer>
    
    )
}