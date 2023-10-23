
import { globalCss } from ".";


export const globalStyle = globalCss({
    "*": {
      margin: 0,
      padding: 0,
      border: 0,
      fontSize: "100%",
   
      verticalAlign: "baseline",
    },
    "article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section":
      {
        display: "block",
      },
    body: {
      lineHeight: 1,
      background:'radial-gradient(at center center,#161C2F 0%, #000000 100%);',
   
   
    },
    "ol, ul": {
      listStyle: "none",
    },
    "blockquote, q": {
      quotes: "none",
    },
    "blockquote:before, blockquote:after, q:before, q:after": {
      content: "''",
    },
    a:{
      textDecoration:'none',
    },
    table: {
      borderCollapse: "collapse",
      borderSpacing: 0,
    },
    button:{
      cursor:'pointer'
    }
  });