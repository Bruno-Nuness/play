import { styled } from ".";

export const ModalDeleteContainer = styled('main',{
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 999,
    div:{
        background:"#43C3DF",
     
        height:'288px',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'column',
        borderRadius:'12px',
        padding:'12px',
        fontSize:'2.2rem',



        'buttons-box':{
            display:'flex',
            gap:'20px',
        
        },
        '.yes':{
            width:'148px',
   
        },
        '.no':{
            width:'148px'
        }

    },
})