import { styled } from ".";

export const ModalUpdateContainer = styled('main',{
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
        display:'flex',
        background:'DarkBlue',
        flexDirection:'column',
        gap2:'20px',
        width:'200px',
        height:'200px',
        justifyContent:'space-around'

    },
})