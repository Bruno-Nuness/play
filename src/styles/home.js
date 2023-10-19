import { styled } from ".";

export const HomeContainer = styled('main',{
    display: "flex",
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    maxWidth:'800px',
    margin: '0 auto ',
    fontFamily:'sans-serif',
    ul:{
        display:'flex',
        flexWrap:'wrap',
       width:'100%',
       marginTop:'4rem',
       gap:'1rem',
    },
    li:{
        display: "flex",
        flexDirection:'column',
        justifyContent:'space-between',
        alignItems:'center',
        width:'215px',
        height:'159px',
        background:'#43C3DF',
        padding:10,
        borderRadius:'10px',
        fontWeight:'bolder',
        border:'4px solid #231F20'

    },
    'li div':{
        width:'100%',
        height:'100%',
        display: "flex",
        flexDirection:'column',
        justifyContent:'space-between',
        alignItems:'center',
    },
    'li div div':{
        width:'100%',
        height:'100%'
    },
    audio:{
        width:200
    },
    '.buttons-box':{
        display:'flex',
        height:'23%',
        flexDirection:'row-reverse',
        alignItems:"center"
    },
    '.buttons-box button':{
        padding:'6px',
        borderRadius:'5px',
        width:'40%',
        background:'#231F20',
        color:'$white',
        fontWeight:'bolder',
        padding:'5px'
    },
    h2:{
        fontSize:'3rem',
        color:'$white',
        marginTop:'3rem'
    }

})