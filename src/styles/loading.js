import { styled } from ".";

export const LoadingContainer = styled('div',{
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
    flexDirection:'column',
    h1:{
        fontSize:'2rem',
        fontWeight:'bolder',
        color:'$white'
    }
})