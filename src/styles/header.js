import { styled } from ".";

export const HeaderContainer = styled('header',{
    width:'100vw',
    background:'#231F20',
    display:'flex',
    justifyContent:'center',

    div:{
        maxWidth:'1200px',
        width:'100%',
        padding:'2rem',
        display: "flex",
        alignItems:'center',
        justifyContent:'center',
        gap:'4rem'
    },
    button:{
        padding:'10px',
        borderRadius:'8px',
        color:'$white',
        fontFamily:'cursive',
        fontWeight:'bolder',
        background:'#43C3DF',
        width:'10rem'
    }

})