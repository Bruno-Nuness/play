import { styled } from "."

export const UploadContainer = styled('main',{
 
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
   marginTop:'4rem',
    zIndex: 999,
    flexDirection:'column',
    gap:'2rem',
    color:'$white',
    'input[type=file]':{
        display:'none'
    },
    label:{
        cursor:'pointer',
        width:'285px',
        height:'230px',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        fontFamily:"sans-serif",
        fontSize:'2rem',
        fontWeight:'bolder',
        background:'#231F20',
        borderRadius:'8px',
        textAlign:'center',
        transition:'0.3s',
        border:'3px solid white'
  
    },
    'label:hover':{
        background:'#43C3DF',
        color:'#231F20',
        border:'3px solid #231F20'
    },
    h1:{
        fontFamily:'circular',
        fontSize:'3rem'
    },
    button:{
        background:'#231F20',
        color:'$white',
        padding:'10px',
        fontSize:'1.6rem',
        fontWeight:'bolder',
        fontFamily:'cursive',
        borderRadius:'10px',
        transition:'0.3s',
        border:'3px solid white',
        width:'9rem'
    },
    'button:hover':{
        background:'#43C3DF',
        color:'#231F20',
        border:'3px solid white'
    },


})